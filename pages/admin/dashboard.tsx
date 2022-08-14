import DashboardPage from "../../components/DashboardPage";
import Header from "../../components/Header";
import UnAuthorised from "../../components/Admin/Dashboard/UnAuthorised";
import {useSession} from "next-auth/react";

const Dashboard = () => {

    const { data: session } = useSession();


    return (
        <>
            <Header/>
            {!session || !session.user?.email?.endsWith("isflemingsberg.se") ? <DashboardPage/> : <UnAuthorised/>  }
        </>
    )
}

export default Dashboard;