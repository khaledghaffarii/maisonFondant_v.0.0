import { Button, TextField, withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import useForm from "./useForm";
import { connect } from 'react-redux';
// import * as actions from "../../actions/modele";
// import ButterToast, { Cinnamon } from "butter-toast";
import env from '../../../static'
import { AssignmentTurnedIn } from "@material-ui/icons";
import Grid from '@material-ui/core/Grid';
import Request from "app/utils/Request";
const initialFieldValues = {
    _id: '',
    code: "",
    item: "",
    center_recuperation: "",
    destination: "",
    prix_piece: 0,
    prix_client: 0,
    status_reparation: "",
    remarque_CS: "",
    remarque_livreur: "",
    status_livraison: "",
    departement: "",
    numeroSerie: "",
    owner: ''

}
//Styles css
const styles = them => ({
    root: {
        "& .MuiTextField-root": {
            margin: them.spacing(1),
            width: 200,
        },
    },
    form: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    }
})

const EtatSortieForm = ({ classes, ...props }) => {
    const request = new Request();
    useEffect(async () => {

        if (props.editRowData) {
           
            setValues(props.editRowData)

        }

       
        setErrors({})
        // }
    }, [props.editRowData])


    const validate = () => {
        let tmp = { ...errors }
        tmp.code = values.code ? "" : "This field is required."
        tmp.item = values.item ? "" : "This field is required."
        tmp.center_recuperation = values.center_recuperation ? "" : "This field is required."
        tmp.destination = values.destination ? "" : "This field is required."

        setErrors({
            ...tmp
        })
        return Object.values(tmp).every(x => x === "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    } = useForm(initialFieldValues, props.setCurrentId);


    const handleSubmit = async e => {
        e.preventDefault()
        //   const onSuccess = () => {
        //     ButterToast.raise({
        //          content: <Cinnamon.Crisp title="Post Box"
        //             content="Submitted successFully"
        //             scheme={Cinnamon.Crisp.SCHEME_PURPLE}
        //             icon={<AssignmentTurnedIn />}
        //         />
        //     })
        //     resetForm()
        // }

        if (validate()) {
            if (props.currentId === 0) {
               
                env.EtatSortie.new(values)
            }
            else {
                const baseUrl = env.EtatSortie.update(values._id);

                const response = await request.updateWithPut(baseUrl, values)

               window.location.reload();
                
            }

        }
    }


    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        name="code"
                        variant="outlined"
                        label="Code"
                        fullWidth
                        value={values.code}
                        onChange={handleInputChange}
                        {...(errors.code && { error: true, helperText: errors.code })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="item"
                        variant="outlined"
                        label="Appareil"
                        fullWidth
                        value={values.item}
                        onChange={handleInputChange}
                        {...(errors.item && {
                            error: true, helperText: errors.item
                        })}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        name="center_recuperation"
                        variant="outlined"
                        label="Centre Récupération"
                        fullWidth
                        value={values.center_recuperation}
                        onChange={handleInputChange}
                        {...(errors.center_recuperation && {
                            error: true, helperText: errors.center_recuperation
                        })}
                    /></Grid>
                <Grid item xs={6}>
                    <TextField
                        name="destination"
                        variant="outlined"
                        label="Destination "
                        // style={{ width: 250 }}
                        fullWidth
                        value={values.destination}
                        onChange={handleInputChange}
                        {...(errors.destination && {
                            error: true, helperText: errors.destination
                        })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="phone"
                        variant="outlined"
                        label="Numero"
                        fullWidth
                        value={values.phone}
                        onChange={handleInputChange}
                        {...(errors.phone && {
                            error: true, helperText: errors.phone
                        })}
                    />
                </Grid>
                <Grid item xs={6}>
                    
                    <TextField
                        name="departement"
                        variant="outlined"
                        label="Departement"
                        fullWidth
                        value={values.departement}
                        onChange={handleInputChange}
                        {...(errors.departement && {
                            error: true, helperText: errors.departement
                        })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="prix_piece"
                        variant="outlined"
                        label="Prix Piece"
                        fullWidth
                        value={values.prix_piece}
                        onChange={handleInputChange}
                        {...(errors.prix_piece && {
                            error: true, helperText: errors.prix_piece
                        })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="prix_client"
                        variant="outlined"
                        label="Prix Client"
                        fullWidth
                        value={values.prix_client}
                        onChange={handleInputChange}
                        {...(errors.prix_client && {
                            error: true, helperText: errors.prix_client
                        })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="remarque_CS"
                        variant="outlined"
                        label="Remarque Customer Success "
                        fullWidth
                        value={values.remarque_CS}
                        onChange={handleInputChange}
                        {...(errors.remarque_CS && {
                            error: true, helperText: errors.remarque_CS
                        })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="remarque_CS"
                        variant="outlined"
                        label="Remarque Livreur"
                        fullWidth
                        value={values.remarque_livreur}
                        onChange={handleInputChange}
                        {...(errors.remarque_livreur && {
                            error: true, helperText: errors.remarque_livreur
                        })}
                    />
                </Grid>
                <Grid item xs={12}>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit">Submit</Button>
                </Grid>
            </Grid>
        </form>
    );
}


export default EtatSortieForm