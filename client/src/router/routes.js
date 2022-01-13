const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },
  {
    path: "/chat",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Chat.vue") }]
  },

  {
    path: "/chatrooms",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ChatRooms.vue") }]
  },

  {
    path: "/chattopics",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ChatTopics.vue") }]
  },

  {
    path: "/online",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/OnlineUsers.vue") }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
