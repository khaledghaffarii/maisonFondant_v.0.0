const permissions = localStorage.getItem("permissions");
const user=localStorage.getItem("AdminOrTeam");

  var arabeLanguage = [
    {
      id: "calendar-component",
      title:"أجندة",
      type: "item",
      icon: "show_chart",
      url: "/calendar"
    },
    {
      'id' : 'statistique-component',
      'title' : 'الإحصائيات',
      'type': 'group',
      'icon': 'show_chart',
      'children':[
          {
  
      'id' : 'admin-component',
      'title' : 'مجلس الإدارة',
      'type': 'item',
      'icon': 'show_chart',
      'url':'/Widget2',
      },
      {
  
          'id' : 'statistic-component',
          'title' : 'إحصائيات',
          'type': 'item',
          'icon': 'show_chart',
          'url':'/Widget1',
          }]
  },
    {
      id: "boutique-dictionary-component",
      title: "المتجر الأساسي",
      type: "item",
      icon: "database",
      url: "/boutique-dictionaire"
    },
    {
      id : 'stock-component',
      title : 'مخزون',
      type: 'item',
      icon: 'item',
      url:'/stock',
    },
    {
      id : 'commandes-component',
      title : 'طلب تجاري',
      type: 'item',
      icon: 'orders',
      url :'/commandes',
    },{
      id: "devis-component",
      title: "تحديد سعر",
      type: "item",
      icon: "database",
      url: "/devis"
    },{
      id: "facture-component",
      title: "فاتورة",
      type: "item",
      icon: "database",
      url: "/facture"
    }
  ];
  
  if (permissions) {
    let per = permissions;
    if (per.indexOf("clients") >= 0) {
      arabeLanguage.push({
        id: "client-component",
        title: "زبائن",
        type: "item",
        icon: "contact_mail",
        url: "/client"
      });
    }
    if (per.indexOf("clientFb") >= 0) {
      arabeLanguage.push({
        id: "clientsFacebook-component",
        title: "زبائن الفيسبوك",
        type: "item",
        icon: "person",
        url: "/clientFb"
      });
    }
    if (per.indexOf("providerAnswers") >= 0) {
      arabeLanguage.push({
        id: "providerAnswer-component",
        title: "استجابة المورد",
        type: "item",
        icon: "face",
        url: "/providerAnswer"
      });
    }
    if (per.indexOf("specialities") >= 0) {
      arabeLanguage.push({
        id: "specialitie-component",
        title: "تخصص",
        type: "item",
        icon: "person",
        url: "/specialitie"
      });
    }
    if (per.indexOf("boutiques") >= 0) {
      arabeLanguage.push({
        id: "Boutique-component",
        title: "متجر",
        type: "item",
        icon: "business",
        url: "/boutique"
      });
    }
    if (per.indexOf("categories") >= 0) {
      arabeLanguage.push({
        id: "categorie-component",
        title: "فئات",
        type: "item",
        icon: "app",
        url: "/category"
      });
    }
    if (per.indexOf("products") >= 0) {
      arabeLanguage.push({
        id: "product-component",
        title: "منتجات",
        type: "item",
        icon: "devices_other",
        url: "/product"
      });
    }
    if (per.indexOf("repairers") >= 0) {
      arabeLanguage.push({
        id: "repairers-component",
        title: "عمال الصيانة",
        type: "item",
        icon: "supervisor_account",
        url: "/repairer"
      });
    }
    if (per.indexOf("reparations") >= 0) {
      arabeLanguage.push({
        id: "reparations-component",
        title: "إصلاحات",
        type: "item",
        icon: "settings",
        url: "/reparation"
      });
    }
    if (per.indexOf("deliveries") >= 0) {
      arabeLanguage.push({
        id: "dilevery-component",
        title: "توصيل",
        type: "item",
        icon: "local_shipping",
        url: "/dilevery"},
        {
          id: "planning-component",
          title: "جداول التوصيل",
          type: "item",
          icon: "local_shipping",
          url: "/planning"},
          {
            id : 'suiviPlanning-component',
            title : ' متابعة جداول التوصيل',
            type: 'item',
            icon: 'item',
            url:'/suiviPlanning',
          },
      );
    }
    if (per.indexOf("financial") >= 0) {
      arabeLanguage.push({
        id: "financial-component",
        title: "الأمور المالية",
        type: "item",
        icon: "monetization_on",
        url: "/financial"
      });
    }
    if (per.indexOf("b2b") >= 0) {
      arabeLanguage.push({
        id: "b2b-component",
        title: "B2B",
        type: "item",
        icon: "monetization_on",
        url: "/b2b"
      });
    }
    if (per.indexOf("messages") >= 0) {
      arabeLanguage.push(
        {
          id: "message-component",
          title: "رسائل",
          type: "item",
          icon: "show_chart",
          url: "/message"
        });
    }
    if (per.indexOf("notifications") >= 0) {
      arabeLanguage.push(
        {
          id: "notification-component",
          title: "إشعارات",
          type: "item",
          icon: "show_chart",
          url: "/notify"
        });
    }
    if (per.indexOf("blogs") >= 0) {
      arabeLanguage.push(
        {
          'id': 'blog-component',
          'title': 'مقالات',
          'type': 'item',
          'icon': 'article',
          'url': '/blog',
        });
    }
    if (user=='admin') {
      arabeLanguage.push(
        {
            'id' : 'permission-component',
            'title' : 'Permissions',
            'type': 'item',
            'icon': 'security',
             'url':'/permission',
        });
    }if (user=='admin') {
      arabeLanguage.push(
        {
          'id' : 'administrator-component',
          'title' : 'Administrateurs',
          'type': 'item',
          'icon': 'person',
          'url':'/administrator',
        });
    }
    if (user=='admin') {
      arabeLanguage.push(
        {
          'id' : 'role-component',
          'title' : 'Role',
          'type': 'item',
          'icon': 'lock',
          'url':'/role',
        });
    }
    if (user=='admin') {
      arabeLanguage.push(
        {
          'id' : 'team-member-component',
          'title' : 'Memebre d\'equipe',
          'type': 'item',
          'icon': 'folder_shared',
          'url':'/teamMember',
        });
    }
    if (user=='admin') {
      arabeLanguage.push(
        {
          id: "keys-component",
          title: "API Keys",
          type: "item",
          icon: "vpn_key",
          url: "/api-keys/list"
        });
    }
  }
  
  export default arabeLanguage;