console.log(localStorage.getItem("AdminOrTeam"))
let user=localStorage.getItem("AdminOrTeam")
const globalUrl="http://51.89.148.95:5000/";
const baseUrl = "http://51.89.148.95:5000/"+user+"-api/v1/";
//const globalUrl="http://127.0.0.1:5000/";
//const baseUrl="http://127.0.0.1:5000/"+user+"-api/v1/";
//const baseUrl = "//api.trustit.tn/team-api/v1/";
module.exports = {
  globalUrl,
  baseUrl,
  auth: {
    login: baseUrl + "auth/login"
  },
  devis:{
    new: baseUrl + 'devis/new',
    list: baseUrl + 'devis/list',
    remove: id => `${baseUrl}devis/delete/${id}`,
    update: id => `${baseUrl}devis/update/${id}`,
    info: baseUrl + 'devis/info',
  },
  device:{
    new: baseUrl + 'device/new',
    list: baseUrl + 'device/list',
    remove: id => `${baseUrl}device/delete/${id}`,
    update: id => `${baseUrl}device/update/${id}`,
    info: baseUrl + 'device/info',
    alldevice: baseUrl + 'device/all'
  },
   brand:{
    new: baseUrl + 'brand/new',
    list: baseUrl + 'brand/list',
    remove: id => `${baseUrl}brand/delete/${id}`,
    update: id => `${baseUrl}brand/update/${id}`,
    info: baseUrl + 'brand/info',
    brandByDevice:baseUrl + 'brand/brandByDevice',
    allBrand: baseUrl + 'brand/all'
  },
  gamme:{
    new: baseUrl + 'gamme/new',
    list: baseUrl + 'gamme/list',
    remove: id => `${baseUrl}gamme/delete/${id}`,
    update: id => `${baseUrl}gamme/update/${id}`,
    info: baseUrl + 'gamme/info',
    allGamme: baseUrl + 'gamme/all'
  },
  model:{
    new: baseUrl + 'model/new',
    list: baseUrl + 'model/list',
    modelByBrandAndDevice: baseUrl + 'model/modelByBrandAndDevice',
    remove: id => `${baseUrl}model/delete/${id}`,
    update: id => `${baseUrl}model/update/${id}`,
    info: baseUrl + 'model/info',
    modelByBrand: baseUrl + 'model/modelByBrand',
    modelByDevice: baseUrl + 'model/modelByDevice',
    allModel: baseUrl + 'model/all'
  },
  reparationType: {
    new: baseUrl + "typeReparation/new",
    list: baseUrl + "typeReparation/list",
    remove: (id) => `${baseUrl}typeReparation/delete/${id}`,
    update: (id) => `${baseUrl}typeReparation/update/${id}`,
    info: baseUrl + "typeReparation/info",
    allReparationType: baseUrl + "typeReparation/all",
  },
  stock: {
    list: baseUrl + 'piece-echange/list',
    new: baseUrl + 'piece-echange/create',
    info: baseUrl + 'piece-echange/info',
    update: id => `${baseUrl}piece-echange/update/${id}`,
    remove: id => `${baseUrl}piece-echange/remove/${id}`,
    link_image: baseUrl + 'piece-echange/link-image',
    unlink_image: baseUrl + 'piece-echange/unlink-image',
    list_commandes: baseUrl + 'piece-echange/orders/list',
    reject_order: baseUrl + 'piece-echange/orders/reject',
    accept_order: baseUrl + 'piece-echange/orders/accept',
    remove_order: baseUrl + 'piece-echange/orders/remove',
    reset_order: baseUrl + 'piece-echange/orders/reset',
  },
  admin: {
    list: baseUrl + "admins/list",
    all: baseUrl + "admins/all",
    new: baseUrl + "admins/new",
    remove: id => `${baseUrl}admins/delete/${id}`,
    update: id => `${baseUrl}admins/update/${id}`,
    info: baseUrl + "admins/info"
  },
  permissions: {
    list: baseUrl + "permissions/list",
    all: baseUrl + "permissions/all",
    new: baseUrl + "permissions/new",
    remove: id => `${baseUrl}permissions/delete/${id}`,
    update: id => `${baseUrl}permissions/update/${id}`,
    info: baseUrl + "permissions/info"
  },
  repairers: {
    list: baseUrl + "repairers/list",
    all: baseUrl + "repairers/all",
    new: baseUrl + "repairers/new",
    remove: id => `${baseUrl}repairers/delete/${id}`,
    update: id => `${baseUrl}repairers/update/${id}`,
    info: baseUrl + "repairers/info",
    unVerify: baseUrl + "repairers/unVerify",
    verify: baseUrl + "repairers/verify",
    reparations: id => `${baseUrl}repairers/reparations/${id}`
  },
  blog: {
    list: baseUrl + 'blog/list',
    all: baseUrl + 'blog/all',
    new: baseUrl + 'blog/new',
    remove: id => `${baseUrl}blog/remove/${id}`,
    update: id => `${baseUrl}blog/edit/${id}`,
    info: baseUrl + 'blog/info',
    upload: baseUrl + 'blog/upload',
    gallery: baseUrl + 'blog/gallery',
    removeGallery: baseUrl + 'blog/gallery/delete',
    commentAction: baseUrl + 'blog/comments/action',
  },
  boutiques: {
    list: baseUrl + "boutiques/list",
    all: baseUrl + "boutiques/all",
    new: baseUrl + "boutiques/new",
    remove: id => `${baseUrl}boutiques/delete/${id}`,
    update: id => `${baseUrl}boutiques/update/${id}`,
    info: baseUrl + "boutiques/info"
  },
  specialities: {
    list: baseUrl + "specialities/list",
    all: baseUrl + "specialities/all",
    new: baseUrl + "specialities/new",
    remove: id => `${baseUrl}specialities/delete/${id}`,
    update: id => `${baseUrl}specialities/update/${id}`,
    info: baseUrl + "specialities/info"
  },
  categories: {
    list: baseUrl + "categories/list/categories",
    all: baseUrl + "categories/all",
    new: baseUrl + "categories/new",
    remove: id => `${baseUrl}categories/delete/${id}`,
    update: id => `${baseUrl}categories/update/${id}`,
    info: baseUrl + "categories/info",
    categories: baseUrl + "categories/categories",
    appareil: baseUrl + "categories/appareils",
    models: baseUrl + "categories/models",
  },
  messages: {
    list: baseUrl + "messages/list",
    update: id => `${baseUrl}messages/update/${id}`,
  },
  b2b: {
    list: baseUrl + "b2b/list",
    update: id => `${baseUrl}b2b/edit/${id}`,
    remove: `${baseUrl}b2b/delete-bulk`,
  },
  country:{
    new: baseUrl + "country/new",
    list: baseUrl + "country/list",
    all: baseUrl + "country/all",
    update: id => `${baseUrl}country/update/${id}`,
    //remove: id => `${baseUrl}country/delete/${id}`,
    info: baseUrl + "country/info"
  },mobility:{
    all: baseUrl + "mobility/all",
  },
  etat:{
    new: baseUrl + "etat/new",
    list: baseUrl + "etat/list",
    all: baseUrl + "etat/all",
    update: id => `${baseUrl}etat/update/${id}`,
    remove: id => `${baseUrl}etat/delete/${id}`,
    info: baseUrl + "etat/info"
  },
  currency:{
    new: baseUrl + "currency/new",
    list: baseUrl + "currency/list",
    all: baseUrl + "currency/all",
    update: id => `${baseUrl}currency/update/${id}`,
    remove: id => `${baseUrl}currency/delete/${id}`,
    info: baseUrl + "currency/info"
  },
  productColor:{
    new: baseUrl + "color/new",
    list: baseUrl + "color/list",
    all: baseUrl + "color/all",
    update: id => `${baseUrl}color/update/${id}`,
    remove: id => `${baseUrl}color/delete/${id}`,
    info: baseUrl + "color/info"
  },
  products: {
    list: baseUrl + "categories/list/products",
    listSuggestion: baseUrl + "categories/listSuggestion/products",
    all: baseUrl + "categories/all/products",
    allForDevis:`${baseUrl}categories/allForDevis/products`,
    new: baseUrl + "categories/new",
    remove: id => `${baseUrl}categories/delete/${id}`,
    update: id => `${baseUrl}categories/update/${id}`,
    info: baseUrl + "categories/info"
  },
  productsReparation: {
    list: baseUrl + "productReparation/list",
    all: baseUrl + "productReparation/all",
    new: baseUrl + "productReparation/new",
    remove: id => `${baseUrl}productReparation/delete/${id}`,
    update: id => `${baseUrl}productReparation/update/${id}`,
    info: baseUrl + "productReparation/info",
    productsReparationByBrandModelAndCountry:baseUrl + "productReparation/productsReparationByBrandModelAndCountry",
  },
  classCategories: {
    list: baseUrl + "class-categories/list",
    all: baseUrl + "class-categories/all",
    new: baseUrl + "class-categories/new",
    remove: id => `${baseUrl}class-categories/delete/${id}`,
    update: id => `${baseUrl}class-categories/update/${id}`,
    info: baseUrl + "class-categories/info"
  },
  clients: {
    list: baseUrl + "clients/list",
    all: baseUrl + "clients/all",
    new: baseUrl + "clients/new",
    remove: id => `${baseUrl}clients/delete/${id}`,
    update: id => `${baseUrl}clients/update/${id}`,
    info: baseUrl + "clients/info",
    searchUserName: baseUrl + "clients/searchUserName",
    reparations: id => `${baseUrl}clients/reparations/${id}`,
    block: id => `${baseUrl}clients/block/${id}`,
    unBlock: id => `${baseUrl}clients/unBlock/${id}`,
    allBlocked: baseUrl + "clients/all/blocked"
  },
  gouvernorats: {
    all: baseUrl + "gouvernorats/getAll",
    info: baseUrl + "gouvernorats/get"
  },
  delegations: {
    info: baseUrl + "delegations/get"
  },
  localites: {
    info: baseUrl + "localites/get"
  },
  reparations: {
    list: baseUrl + "reparations/list",
    archive: baseUrl + "reparations/archive",
    restore: baseUrl + "reparations/restore",
    listCustomerSuccess: baseUrl + "",
    allForDevis: baseUrl + "reparations/allForDevis",
    all: baseUrl + "reparations/all",
    new: baseUrl + "reparations/new",
    remove: id => `${baseUrl}reparations/delete/${id}`,
    update: id => `${baseUrl}reparations/update/${id}`,
    info: baseUrl + "reparations/info",
    allCustomerSucces: baseUrl + "reparations/all/customerSuccess",
    exports: baseUrl + 'reparations/exports',
    exportAll: baseUrl + 'reparations/export-all',
  },
  roles: {
    list: baseUrl + "roles/list",
    all: baseUrl + "roles/all",
    new: baseUrl + "roles/new",
    remove: id => `${baseUrl}roles/delete/${id}`,
    update: id => `${baseUrl}roles/update/${id}`,
    info: baseUrl + "roles/info"
  },
  teams: {
    list: baseUrl + "teams/list",
    all: baseUrl + "teams/all",
    new: baseUrl + "teams/new",
    remove: id => `${baseUrl}teams/delete/${id}`,
    update: id => `${baseUrl}teams/update/${id}`,
    info: baseUrl + "teams/info"
  },
  teamMembers: {
    list: baseUrl + "team-members/list",
    all: baseUrl + "team-members/all",
    new: baseUrl + "team-members/new",
    remove: id => `${baseUrl}team-members/delete/${id}`,
    update: id => `${baseUrl}team-members/update/${id}`,
    info: baseUrl + "team-members/info"
  },
  calendar: {
    all: baseUrl + "events/all",
    new: baseUrl + "events/new",
    remove: id => `${baseUrl}events/delete/${id}`,
    update: id => `${baseUrl}events/update/${id}`,
    info: baseUrl + "events/info",
    myEvents: id => `${baseUrl}events/myEvents/${id}`
  },
  clientFacebook: {
    list: baseUrl + "facebook-client/list",
    new: baseUrl + "facebook-client/new",
    getAutreCategorie: baseUrl + "facebook-client/getAutre",
    remove: id => `${baseUrl}facebook-client/delete`,
    update: (id) => `${baseUrl}facebook-client/update/${id}`,
    info: baseUrl + "facebook-client/info",
    confirmer: id => `${baseUrl}facebook-client/confirmer/${id}`,
    reparations: id => `${baseUrl}facebook-client/reparations/${id}`
  },
  deliveries: {
    list: baseUrl + "deliveries/list",
    all: baseUrl + "deliveries/all",
    new: baseUrl + "deliveries/new",
    remove: id => `${baseUrl}deliveries/delete/${id}`,
    update: id => `${baseUrl}deliveries/update/${id}`,
    info: baseUrl + "deliveries/info",
    createPdf: baseUrl + "deliveries/create-pdf",
    planning: baseUrl + 'deliveries/planning',
    fetchPdf: code => `${baseUrl}deliveries/fetch-pdf/${code}`
  },
  Plannings: {
    list: baseUrl + "plannings/list",
    all: baseUrl + "plannings/all",
    new: baseUrl + "plannings/new",
    remove: id => `${baseUrl}plannings/delete/${id}`,
    update: id => `${baseUrl}plannings/edit/${id}`,
    info: baseUrl + "plannings/info",
    
  },
  EtatSortie: {
    list: baseUrl + "etatSorties/list",
    all: baseUrl + "etatSorties/all",
    new: baseUrl + "etatSorties/new",
    remove: id => `${baseUrl}etatSorties/delete/${id}`,
    update: id => `${baseUrl}etatSorties/update/${id}`,
    info: baseUrl + "etatSorties/info",
    
  },
  providersAnswer: {
    list: baseUrl + "providerAnswers/list",
    all: baseUrl + "providerAnswers/all",
    new: baseUrl + "providerAnswers/new",
    remove: id => `${baseUrl}providerAnswers/delete/${id}`,
    update: id => `${baseUrl}providerAnswers/update/${id}`,
    info: baseUrl + "providerAnswers/info",
    clientFbInfo: baseUrl + "providerAnswers/clientFb/info"
  },
  statistiques: {
    all: baseUrl + "statistiques/all",
    new: baseUrl + "statistiques/new",
    remove: id => `${baseUrl}statistiques/delete/${id}`,
    update: id => `${baseUrl}statistiques/update/${id}`,
    info: baseUrl + "statistiques/info",
    get: baseUrl + "statistiques",
    getWeek: baseUrl + "statistiques/getWeek"
  },
  financials: {
    list: baseUrl + "reparations/financial/list",
    all: baseUrl + "reparations/financial/all",
    new: baseUrl + "reparations/financial/new",
    remove: id => `${baseUrl}reparations/financial/delete/${id}`,
    update: id => `${baseUrl}reparations/financial/update/${id}`,
    info: baseUrl + "reparations/financial/info"
  },
  staticFiles: 'http://51.89.148.95:5000',
  //staticFiles: "//statics.trustit.tn/",
  REP_RETOUR:{
    TRUE:'true',
    FALSE:'false'
  },
  REP_STATES: { 
    NON_DEPOSED: 'Nouveau Client',
    DEPOSED_BY_CLIENT: 'Déposé',
    UNDER_DIAGNOSIS: 'Sous Diagnostic',
    READY_TO_TRANSFER: 'Prêt pour Transfert',
    DIAGNOSIS_ENDED: 'Diagnostic Terminé',
    REPARATION_REJECTED: 'Réparation Refusée',
    REFUSEE_PAYE: 'Refusée payée',
    UNDER_REPARATION: 'Réparation en Cours',
    READY_TO_DELIVER: 'Prêt pour Livraison',
    READY_TO_PICKUP: 'Prêt pour Récupération',
    PICKEDUP_BY_CLIENT: 'Récupéré par le Client',
    PICKEDUP_BY_DELIVERY: 'Récupéré par le Livreur',
    REPAIRED: 'Réparé',
    UNREPAIRED: 'Irréparable',
    IRREPARABLE_PAYE: 'Irréparable payé',
    TRANSFER_TO_SPECIALIST: 'Transféré au Spécialiste',
    REQUEST_PIECE: 'Demande de Pièce de Rechange',
    SAV_RECUPERE: 'SAV Récupéré',

  },
  STATES_REPARATION: { 
    R100: {
      LABEL_FR:'Nouvelle réparation',
      VALUE:"R100"
    },
    R101: {
      LABEL_FR:'Réparation déposée',
      VALUE:"R101"
    },
    R102: {
      LABEL_FR:'Demande de transit',
      VALUE:"R102"
    },
    R103: {
      LABEL_FR:'Réparation en transit',
      VALUE:"R103"
    },
    R104: {
      LABEL_FR:'Réparation affectée',
      VALUE:"R104"
    },
    R105: {
      LABEL_FR:'Sous diagnostique',
      VALUE:"R105"
    },
    R106: {
      LABEL_FR:'Irréparable',
      VALUE:"R106"
    },
    R107: {
      LABEL_FR:'Demande de piéce',
      VALUE:"R107"
    },
    R108: {
      LABEL_FR:'Diagnostique terminée',
      VALUE:"R108"
    },
    R109: {
      LABEL_FR:'Réparation refusée',
      VALUE:"R109"
    },
    R110: {
      LABEL_FR:'Réparation approuvée',
      VALUE:"R110"
    },
    R111: {
      LABEL_FR:'Réparation en cours',
      VALUE:"R111"
    },
    R112: {
      LABEL_FR:'Réparation effectuée',
      VALUE:"R112"
    },
    R113: {
      LABEL_FR:'Prêt pour récupération',
      VALUE:"R113"
    },
    R114: {
      LABEL_FR:'Réparation récupérée',
      VALUE:"R114"
    },
    R115: {
      LABEL_FR:'Réparation réclamée',
      VALUE:"R115"
    },
    R116: {
      LABEL_FR:'Réparation Traitée',
      VALUE:"R116"
    },
  },
  REP_LABELS: {
    
    NON_DEPOSED: 'Nouveau Client',
    DEPOSED_BY_CLIENT: 'Déposé',
    UNDER_DIAGNOSIS: 'Sous Diagnostic',
    READY_TO_TRANSFER: 'Prêt pour Transfert',
    DIAGNOSIS_ENDED: 'Diagnostic Terminé',
    REPARATION_REJECTED: 'Réparation Refusée',
    REFUSEE_PAYE: 'Refusée payé',
    UNDER_REPARATION: 'Réparation en Cours',
    READY_TO_DELIVER: 'Prêt pour Livraison',
    READY_TO_PICKUP: 'Prêt pour Récupération',
    PICKEDUP_BY_CLIENT: 'Récupéré par le Client',
    PICKEDUP_BY_DELIVERY: 'Récupéré par le Livreur',
    REPAIRED: 'Réparé',
    UNREPAIRED: 'Irréparable',
    IRREPARABLE_PAYE: 'Irréparable payé',
    TRANSFER_TO_SPECIALIST: 'Transféré au Spécialiste',
    REQUEST_PIECE: 'Demande de Pièce de Rechange',
    SAV_RECUPERE: 'SAV Récupéré',
  },
  BOUTIQUE_STATE: {
    ACTIVE_VISIBLE: 'Actif & Visible',
    ACTIVE_NOT_VISIBLE: 'Actif Non visible',
    NOT_ACTIVE: 'Non Actif',
    SUSPENDED: 'Suspendu',
    UNDER_VERIFICATION: 'En cours de vérification',
  },
  FLAT_UI: {
    lightSeaGreen: '#4ecdc4',
    mediumTurquoise: '#34a39c',
    turquoise: '#3cbc9b',
    greenSea: '#32a085',
    sunFlower: '#f1c40f59',
    orange: '#f39c11',
    capeHoney: '#fce3a6',
    confetti: '#e9d460',
    cossip: '#87d37c',
    salem: '#26824c',
    emerald: '#41cc70',
    nephritis: '#e67e23',
    carrot: '#e67e23',
    pumpkin: '#d35400',
    jaffa: '#f27936',
    ecstasy: '#f66910',
    riptide: '#86e2d5',
    dodgerBlue: '#3fb5fe',
    peterRiver: '#5ca7dd',
    beuzeHole: '#2a80b9',
    alizarin: '#e74c3b59',
    pomegranate: '#c0392a',
    thunderbird: '#d91e19',
    monza: '#cf000f',
    lightWiseria: '#be90d4',
    plum: '#913d88',
    amethyst: '#9b59b6',
    wisteria: '#8e43ad',
    clouds: '#ecf0f159',
    silver: '#bdc3c7',
    callery: '#eeeeee',
    iron: '#dadfe1',
    hoki: '#67809f',
    ebonyClay: '#223140',
    wetAsphalt: '#34495d',
    midnightBlue: '#2c3e50',
    concrete: '#95a5a6',
    asbestos: '#7f8c8d',
    pumice: '#d2d7d3',
    lynch: '#6c7a89',
  }
};
