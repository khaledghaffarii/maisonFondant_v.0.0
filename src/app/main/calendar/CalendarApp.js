/* eslint-disable no-unused-vars */
import React, { Component, createRef } from "react";
import { withStyles } from "@material-ui/core/styles";
// import BigCalendar from "react-big-calendar";
import { Calendar, momentLocalizer } from 'react-big-calendar'
//import Views from "react-big-calendar";
import decode from "jwt-decode";
import { withSnackbar } from "notistack";
import PropTypes from "prop-types";

import clsx from "clsx";

import moment from "moment";
import "./App.css";
import { makeStyles } from "@material-ui/styles";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import Request from "../../utils/Request";
import env from "../../static";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import T from '../../textes'
import { Fab, Icon, IconButton } from "@material-ui/core";
import { FuseAnimate, FusePageCarded } from "@fuse";
import CalendarHeader from "./CalendarHeader";
// const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const localizer = momentLocalizer(moment); // or globalizeLocalizer
const DragAndDropCalendar = withDragAndDrop(Calendar);

const useStyles = makeStyles(theme => ({
  root: {
    '& .rbc-header': {
      padding: '12px 6px',
      fontWeight: 600,
      fontSize: 14
    },
    '& .rbc-label': {
      padding: '8px 6px'
    },
    '& .rbc-today': {
      backgroundColor: 'transparent'
    },
    '& .rbc-header.rbc-today, & .rbc-month-view .rbc-day-bg.rbc-today': {
      borderBottom: '2px solid ' + theme.palette.secondary.main + '!important'
    },
    '& .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view': {
      padding: 24,
      [theme.breakpoints.down('sm')]: {
        padding: 16
      },
      ...theme.mixins.border(0)
    },
    '& .rbc-agenda-view table': {
      ...theme.mixins.border(1),
      '& thead > tr > th': {
        ...theme.mixins.borderBottom(0)
      },
      '& tbody > tr > td': {
        padding: '12px 6px',
        '& + td': {
          ...theme.mixins.borderLeft(1)
        }
      }
    },
    '& .rbc-time-view': {
      '& .rbc-time-header': {
        ...theme.mixins.border(1)
      },
      '& .rbc-time-content': {
        flex: '0 1 auto',
        ...theme.mixins.border(1)
      }
    },
    '& .rbc-month-view': {
      '& > .rbc-row': {
        ...theme.mixins.border(1)
      },
      '& .rbc-month-row': {
        ...theme.mixins.border(1),
        borderWidth: '0 1px 1px 1px!important',
        minHeight: 128
      },
      '& .rbc-header + .rbc-header': {
        ...theme.mixins.borderLeft(1)
      },
      '& .rbc-header': {
        ...theme.mixins.borderBottom(0)
      },
      '& .rbc-day-bg + .rbc-day-bg': {
        ...theme.mixins.borderLeft(1)
      }
    },
    '& .rbc-day-slot .rbc-time-slot': {
      ...theme.mixins.borderTop(1),
      opacity: 0.5
    },
    '& .rbc-time-header > .rbc-row > * + *': {
      ...theme.mixins.borderLeft(1)
    },
    '& .rbc-time-content > * + * > *': {
      ...theme.mixins.borderLeft(1)
    },
    '& .rbc-day-bg + .rbc-day-bg': {
      ...theme.mixins.borderLeft(1)
    },
    '& .rbc-time-header > .rbc-row:first-child': {
      ...theme.mixins.borderBottom(1)
    },
    '& .rbc-timeslot-group': {
      minHeight: 64,
      ...theme.mixins.borderBottom(1)
    },
    '& .rbc-date-cell': {
      padding: 8,
      fontSize: 16,
      fontWeight: 400,
      opacity: .5,
      '& > a': {
        color: 'inherit'
      }
    },
    '& .rbc-event': {
      borderRadius: 4,
      padding: '4px 8px',
      backgroundColor: '#039be5',
      color: theme.palette.primary.contrastText,
      boxShadow: theme.shadows[0],
      transitionProperty: 'box-shadow',
      transitionDuration: theme.transitions.duration.short,
      transitionTimingFunction: theme.transitions.easing.easeInOut,
      position: 'relative',
      '&:hover': {
        boxShadow: theme.shadows[2]
      }
    },
    '& .rbc-row-segment': {
      padding: '0 4px 4px 4px'
    },
    '& .rbc-off-range-bg': {
      backgroundColor: theme.palette.type === 'light' ? 'rgba(0,0,0,0.03)' : 'rgba(0,0,0,0.16)'
    },
    '& .rbc-show-more': {
      color: theme.palette.secondary.main,
      background: 'transparent'
    },
    '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event': {
      position: 'static'
    },
    '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:first-child': {
      left: 0,
      top: 0,
      bottom: 0,
      height: 'auto'
    },
    '& .rbc-addons-dnd .rbc-addons-dnd-resizable-month-event .rbc-addons-dnd-resize-month-event-anchor:last-child': {
      right: 0,
      top: 0,
      bottom: 0,
      height: 'auto'
    }
  },
  addButton: {
    position: 'absolute',
    right: 12,
    top: 172,
    zIndex: 99
  }
}));


class CalendarApp extends Component {
  request = new Request();

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      propsHeader: null
    };
  }
  async componentDidMount() {
    try {
      const user = decode(localStorage.getItem("id_token"));
      const url = env.calendar.myEvents(user.id);
      const response = await this.request.getAll(url);
      const data = [];

      response.data.forEach(elem => {
        data.push({
          id: elem._id,
          title: elem.title,
          start: moment(elem.start).toDate(),
          end: moment(elem.end).toDate(),
          content: elem.content,
        });
      });
      this.setState({
        events: data
      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error"
        });
      } else {
        this.props.enqueueSnackbar("Erreur", {
          variant: "error"
        });
      }
    }
  }
  DialogPrompt() {
    return;
  }
  async saveEvent() {
    this.setState({ showLoader: true })
    const title = this.state.title;
    const content = this.state.content;
    const user = decode(localStorage.getItem("id_token"));
    const owner = user.id;
    if (title) {
      const url = env.calendar.new;
      const data = {
        title: this.state.title,
        content: this.state.content,
        start: moment(this.state.start).toDate(),
        end: moment(this.state.end).toDate(),
        owner: owner
      };
      await this.request.new(url, data, false);
      this.setState({
        showAddEvent: false,
        showLoader: false,
        events: [
          ...this.state.events,
          {
            start: this.state.start,
            end: this.state.end,
            title,
            content,
          }
        ]
      });
    }
  }

  async updateEvent() {
    this.setState({ showLoader: true })
    const title = this.state.title;
    const user = decode(localStorage.getItem("id_token"));
    if (title) {
      const url = env.calendar.update(this.state._id);
      const data = {
        title: this.state.title,
        content: this.state.content,
        start: this.state.start,
        end: this.state.end,
      };
      await this.request.new(url, data, false);
      let es = this.state.events;
      es[this.state.index].title = this.state.title;
      es[this.state.index].content = this.state.content;
      this.setState({
        showUpdateEvent: false,
        showLoader: false,
        events: es
      });
    }
  }
  handleUpdate(event) {
    this.setState({
      _id: event.id,
      showUpdateEvent: true,
      title: event.title,
      content: event.content,
      start: event.start,
      end: event.end,
      index: this.state.events.findIndex(x => x.id === event.id)
    })
  }
  handleSelect = async ({ event, start, end }) => {
    this.setState({
      showAddEvent: true,
      start,
      end,
    });
  };
  async moveEvent({ event, start, end }) {
    const events = this.state.events;
    const updatedEvent = { ...event, start, end };
    const idx = events.indexOf(event);

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents
    });
    try {
      const url = env.calendar.update(updatedEvent.id);
      const data = {
        title: updatedEvent.title,
        start: moment(updatedEvent.start).toDate(),
        end: moment(updatedEvent.end).toDate(),
        owner: updatedEvent.owner
      };
      await this.request.new(url, data, false);

      this.props.enqueueSnackbar("Operation reussi avec succes", {
        variant: "success"
      });
    } catch (e) {
      if (e.response) {
        this.props.enqueueSnackbar(e.response.data.message, {
          variant: "error"
        });
      } else {
        this.props.enqueueSnackbar("Erreur", {
          variant: "error"
        });
      }
    }
  }
  async handleEventResize(event) {
    this.setState({ showLoader: true })
    const title = this.state.title;
    const user = decode(localStorage.getItem("id_token"));
    if (title) {
      const url = env.calendar.update(event.event.id);
      const data = {
        start: event.start,
        end: event.end,
      };
      await this.request.new(url, data, false);
      let es = this.state.events;
      let index = this.state.events.findIndex(x => x.id === event.event.id);
      es[index].start = event.start;
      es[index].end = event.end;
      this.setState({
        showUpdateEvent: false,
        showLoader: false,
        events: es
      });
    }
  }
  async deleteEvent(){
    const id = this.state._id;
    const url = env.calendar.remove(id);
    await this.request.delete(url);
    let es = this.state.events;
    let index = this.state.events.findIndex(x => x.id === id);
    es.splice(index, 1);
    this.setState({
      events: es,
      showUpdateEvent: false,
    })
  }
  render() {
    const { classes } = this.props;
    const messages = {
      allDay: 'journée',
      previous: 'précédent',
      next: 'suivant',
      today: 'aujourd\'hui',
      month: 'mois',
      week: 'semaine',
      day: 'jour',
      agenda: 'Agenda',
      date: 'date',
      time: 'heure',
      event: 'événement', // Or anything you want
      showMore: total => `+ ${total} événement(s) supplémentaire(s)`
    }
    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot
        }}
        content={
          <div className="p-24">
            <DragAndDropCalendar
              className="flex flex-1 container fullvh"
              selectable
              messages={messages}
              localizer={localizer}
              events={this.state.events}
              onEventDrop={this.moveEvent.bind(this)}
              scrollToTime={new Date(1970, 1, 1, 6)}
              defaultDate={new Date()}
              onSelectEvent={this.handleUpdate.bind(this)}
              onSelectSlot={this.handleSelect.bind(this)}
              onEventResize={this.handleEventResize.bind(this)}
              showMultiDayTimes
            />
            <Dialog
              open={this.state.showAddEvent}
              onClose={() => { this.setState({ showAddEvent: false }) }}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">{T.REMINDER}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label={T.REMINDER_TITLE}
                  type="text"
                  fullWidth
                  onChange={e => this.setState({ title: e.target.value })}
                />
                <TextField
                  margin="dense"
                  id="content"
                  label={T.REMINDER_CONTENT}
                  type="text"
                  fullWidth
                  multiline
                  rows={5}
                  onChange={e => this.setState({ content: e.target.value })}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.setState({ showAddEvent: false })} color="primary">
                  {T.CANCEL}
                </Button>
                <Button onClick={this.saveEvent.bind(this)} color="success">
                  {T.REMINDER_SAVE}
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={this.state.showUpdateEvent}
              onClose={() => { this.setState({ showUpdateEvent: false }) }}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                {T.REMINDER}
                <IconButton style={{float: 'right'}} onClick={this.deleteEvent.bind(this)}>
                  <Icon>delete</Icon>
                </IconButton>  
              </DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label={T.REMINDER_TITLE}
                  type="text"
                  fullWidth
                  value={this.state.title}
                  onChange={e => this.setState({ title: e.target.value })}
                />
                <TextField
                  margin="dense"
                  id="content"
                  label={T.REMINDER_CONTENT}
                  type="text"
                  fullWidth
                  multiline
                  rows={5}
                  value={this.state.content}
                  onChange={e => this.setState({ content: e.target.value })}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.setState({ showUpdateEvent: false })} color="primary">
                  {T.CANCEL}
                </Button>
                <Button onClick={this.updateEvent.bind(this)} color="success">
                  {T.REMINDER_UPDATE}
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        }
      />

    );
  }
}
CalendarApp.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(useStyles)(withSnackbar(CalendarApp));
