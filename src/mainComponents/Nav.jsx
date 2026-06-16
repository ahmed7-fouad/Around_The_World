import Logo from "../secondaryComponents/Logo";
import ThemeSwitcher from "../secondaryComponents/ThemeSwitcher";
export default function Nav() {
  return (
    <>
      <section className="bg-main shadow-lg dark:bg-mainDark ">
        <section className="mainContainer flex items-center justify-between py-3">
          <Logo />
          <ThemeSwitcher color="default" />
        </section>
      </section>
    </>
  );
}
