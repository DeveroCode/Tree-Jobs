import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import MyWorksView from "@/views/Dashboard/MyWorksView";
import AddWorkView from "@/views/Dashboard/AddWorkView";
import EditWorkView from "@/views/Dashboard/EditWorkView";
import AuthLayout from "@/layouts/AuthLayout";
import LoginView from "@/views/Auth/LoginView";
import RegisterView from "@/views/Auth/RegisterView";
import ConfirmAccountView from "@/views/Auth/ConfirmAccountView";
import RequestNewCodeView from "@/views/Auth/RequestNewCodeView";
import ForgotPasswordView from "@/views/Auth/ForgotPasswordView";
import ChangePasswordView from "@/views/Auth/ChangePasswordView";
import ProfileView from "@/views/Profile/ProfileView";
import ProfileLayout from "./layouts/ProfileLayout";
import PictureView from "./views/Profile/PictureView";
import IndexView from "./views/Profile/IndexView";
import RequireRoles from "./middleware/RequireRoles";
import JobsView from "./views/Principal/JobsView";
import CandidatesView from "./views/Dashboard/CandidatesView";
import MyApplicationsView from "./views/Dashboard/Candidate/MyApplicationsView";
import MessageView from "./views/Dashboard/Candidate/MessageView";
import SavedJobsView from "./views/Dashboard/Candidate/SavedJobsView";
import IndexMainLayout from "./layouts/IndexMainLayout";
import MainView from "./views/Landing/MainView";
import Not_found from "./views/Not_found";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tree-jobs" element={<IndexMainLayout />} >
          <Route element={<MainView />} index />
          <Route path="jobs" element={<JobsView />} />
        </Route>
        <Route path="*" element={<Not_found />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="messages" element={<MessageView />} />
          <Route element={<RequireRoles roles={["recrutier"]} />}>
            <Route path="job-listings" element={<MyWorksView />} />
            <Route path="add-work" element={<AddWorkView />} />
            <Route path="edit-work/:workId" element={<EditWorkView />} />
            <Route path="candidates" element={<CandidatesView />} />
          </Route>

          <Route element={<RequireRoles roles={["candidate"]} />}>
            <Route path="my-applications" element={<MyApplicationsView />} />
            <Route path="saved-jobs" element={<SavedJobsView />} />
          </Route>

          <Route path="settings" element={<ProfileLayout />}>
            <Route path="general" index element={<IndexView />} />
            <Route path="security-settings" index element={<ProfileView />} />
            <Route path="profile-photo" index element={<PictureView />} />
          </Route>
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route index path="login" element={<LoginView />} />
          <Route path="register" element={<RegisterView />} />
          <Route path="confirm-account" element={<ConfirmAccountView />} />
          <Route path="request-code" element={<RequestNewCodeView />} />
          <Route path="forgot-my-password" element={<ForgotPasswordView />} />
          <Route path="change-password" element={<ChangePasswordView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
