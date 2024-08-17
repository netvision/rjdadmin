const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "contact",
        component: () => import("src/pages/ContactPage.vue"),
      },
      {
        path: "about",
        component: () => import("src/pages/AboutPage.vue"),
      },
      {
        path: "collaborators",
        component: () => import("src/pages/CollaboratorsPage.vue"),
      },
      {
        path: "activities",
        component: () => import("src/pages/ActivitiesPage.vue"),
      },
      {
        path: "villages",
        component: () => import("src/pages/VillagesPage.vue"),
      },
      {
        path: "reports",
        component: () => import("src/pages/ReportsPage.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AuthPage.vue") },
      {
        path: "home",
        component: () => import("src/pages/HomePage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
