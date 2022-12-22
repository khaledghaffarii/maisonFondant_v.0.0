import arabeLanguage from '../fuse-configs/navigationLanguage/arabeLanguage.js';
import englishLanguage from '../fuse-configs/navigationLanguage/englishLanguage.js';
import frenchLanguage from '../fuse-configs/navigationLanguage/frenchLanguage.js';
import i18next from '../../i18n';
const children=i18next.language=="ar"?arabeLanguage:i18next.language=="en"?englishLanguage:frenchLanguage;
const navigationConfig = [
  {
    id: "applications",
    title: "",
    type: "group",
    icon: "apps",
    children: children
  }
];

export default navigationConfig;

/*
const permissions = localStorage.getItem('permissions');
let per = [];
if(permissions){
    per = permissions.split('/');
}




/*
{
        'id' : 'statistique-component',
        'title' : 'statistique',
        'type': 'item',
        'icon': 'person',
        'url':'/statistique',
    },

*/
/*
const children = [

    {
    'id' : 'calendar-component',
    'title' : 'Calendar',
    'type': 'item',
    'icon': 'person',
    'url':'/calendar',
},
{
    'id' : 'statistique-component',
    'title' : 'statistique',
    'type': 'item',
    'icon': 'person',
    'url':'/statistique',
},

{
    'id' : 'reparations-component',
    'title' : 'Reparations',
    'type': 'item',
    'icon': 'person',
    'url':'/reparation',
},
{
    'id' : 'clientsFacebook-component',
    'title' : 'Clients facebook',
    'type': 'item',
    'icon': 'person',
    'url':'/clientFb',
},
{
    'id' : 'categorie-component',
    'title' : 'Categories',
    'type': 'item',
    'icon': 'person',
    'url':'/category',
},
{
    'id' : 'product-component',
    'title' : 'Products',
    'type': 'item',
    'icon': 'person',
    'url':'/product',
},
{
    'id' : 'dilevery-component',
    'title' : 'Dilevery',
    'type': 'item',
    'icon': 'person',
    'url':'/dilevery',
},
{
    'id' : 'financial-component',
    'title' : 'financial',
    'type': 'item',
    'icon': 'person',
    'url':'/financial',
},
];
if(per.indexOf('clients')>=0){
    children.push({
        'id' : 'client-component',
        'title' : 'Client',
        'type': 'item',
        'icon': 'person',
        'url':'/client',
    })
}
if(per.indexOf('permissions')>=0){
    children.push({
        'id' : 'permission-component',
        'title' : 'Permission',
        'type': 'item',
        'icon': 'person',
        'url':'/permission',
    })
}
if(per.indexOf('roles')>=0){
    children.push({
        'id' : 'role-component',
        'title' : 'Role',
        'type': 'item',
        'icon': 'person',
        'url':'/role',
    })

}
if(per.indexOf('teams')>=0){
    children.push({
        'id' : 'team-component',
        'title' : 'Team',
        'type': 'item',
        'icon': 'person',
        'url':'/team',
    })
}
if(per.indexOf('team-members')>=0){
    children.push({
        'id' : 'team-member-component',
        'title' : 'Memebre d\'equipe',
        'type': 'item',
        'icon': 'person',
        'url':'/teamMember',
    })
}
if(per.indexOf('specialities')>=0){
    children.push({
        'id' : 'specialitie-component',
        'title' : 'Specialitie',
        'type': 'item',
        'icon': 'person',
        'url':'/specialitie',
    })
}
if(per.indexOf('boutiques')>=0){
    children.push({
        'id' : 'Boutique-component',
        'title' : 'Boutique',
        'type': 'item',
        'icon': 'person',
        'url':'/boutique',
    })
}
/*
if(per.indexOf('categories')>=0){
    children.push({
        'id' : 'categorie-component',
        'title' : 'Categories',
        'type': 'item',
        'icon': 'person',
        'url':'/category',
    })
}
*/
/*
if(per.indexOf('class-categories')>=0){
    children.push({
        'id' : 'class-category-component',
        'title' : 'Classe Category',
        'type': 'item',
        'icon': 'person',
        'url':'/classCategory',
    })
}
if(per.indexOf('repairers')>=0){
    children.push({
        'id' : 'repairers-component',
        'title' : 'Repairers',
        'type': 'item',
        'icon': 'person',
        'url':'/repairer',
    })
}
/*
if(per.indexOf('reparations')>=0){
    children.push({
        'id' : 'reparations-component',
        'title' : 'Reparations',
        'type': 'item',
        'icon': 'person',
        'url':'/reparation',
    })
}
*/
/*
const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': children
    }
];

export default navigationConfig;
*/
