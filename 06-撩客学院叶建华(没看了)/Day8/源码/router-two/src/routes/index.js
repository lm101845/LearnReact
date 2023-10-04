import Home from "./../components/Home";
import Student from "./../components/Student";
import User from "./../components/User";
import Info from './../components/User/Info';
import Main from './../components/User/Main';

let routes = [
    {path: "/", component: Home, exact: true},
    {path: "/stu", component: Student},
    {
        path: "/user",
        component: User,
        routes: [
            {path: "/user/", component: Main},
            {path: "/user/info", component: Info}
        ]
    },
];

export default routes;