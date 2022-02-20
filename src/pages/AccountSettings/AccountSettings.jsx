import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { HeadingMain } from "../components/HeadingMain/HeadingMain";
import { NavBar } from "../components/Navbar/Navbar";
import "./AccountSettings.css";

export function AccountSettings() {
  return (
    <div className="account-setting">
      <NavBar />
      <section className="account-setting__main">
        <div className="account__main">
          <div className="setting__header">
            <HeadingMain name={"Account Settings"} />
            <div className="setting__header-link">
              <NavLink
                to="profile"
                exact="true"
                end
                className={({ isActive }) =>
                  !isActive
                    ? "setting__header-item"
                    : "setting__header-item active-settings"
                }
              >
                Profile
              </NavLink>
              <NavLink
                to="password"
                exact="true"
                end
                className={({ isActive }) =>
                  !isActive
                    ? "setting__header-item"
                    : "setting__header-item active-settings"
                }
              >
                Password
              </NavLink>
            </div>
          </div>

          <section className="account__content">
            <Outlet />
          </section>
        </div>
      </section>
    </div>
  );
}
