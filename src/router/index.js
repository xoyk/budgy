import Vue from "vue";
import VueRouter from "vue-router";
import Period from "@/views/Period";
import Plan from "@/views/Plan";
import Login from "../components/Login";
import Secure from "../components/Secure";
import Sighup from "../components/Sighup";
import Expense from "../views/Expense";
import Income from "../views/Income";
import Saving from "../views/Saving";
import Account from "../views/Account";
import store from "../store/index"
import PeriodCreate from "../views/PeriodCreate";
import Transaction from "../views/Transaction"
import ExpenseSource from "../components/tabs/ExpenseSource";
import AccountSource from "../components/tabs/AccountSource";
import TransactionSuccess from "../views/TransactionSuccess";
import TransactionTest from "../views/TransactionTest";
import PeriodCurrent from "../views/PeriodCurrent";
import Menu from "../views/Menu";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    redirect: {
      name: "period",
      params: { periodId: "current" }
    }
  },
  {
    path: "/period/current",
    name: "period_current",
    component: PeriodCurrent,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/period/:periodId",
    name: "period",
    component: Period,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/period-create/",
    name: "period-create",
    component: PeriodCreate,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/test/:transactionId",
    name: "transaction-test",
    component: TransactionTest,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/transaction/:transactionId",
    name: "transaction",
    component: Transaction,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/transaction/:transactionId/expense",
    name: "transaction-edit-expense",
    component: ExpenseSource,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/transaction/:transactionId/account/:type/",
    name: "transaction-edit-account",
    component: AccountSource,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/transaction-edit/steps/success",
    name: "transaction-success",
    component: TransactionSuccess,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/plan/:periodId",
    name: "plan",
    component: Plan,
    props: true
  },
  {
    path: "/expense/:periodId",
    name: "expense",
    component: Expense,
    props: true
  },
  {
    path: "/income/:periodId",
    name: "income",
    component: Income,
    props: true
  },
  {
    path: "/saving/:periodId",
    name: "saving",
    component: Saving,
    props: true
  },
  {
    path: "/account/",
    name: "account",
    component: Account,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'signup',
    component: Sighup
  },
  {
    path: '/secure',
    name: 'secure',
    component: Secure,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  //console.log(routes.meta.requiresAuth)
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router;
