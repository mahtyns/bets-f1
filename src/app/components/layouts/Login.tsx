import Title from "../atoms/Title";
import LoginForm from "../organisms/login/LoginForm";

const Login = () => {
    const mainClass = "login";

    return (
        <section id="login" className={mainClass}>
            <div className={`${mainClass}__card`}>
                <Title isH1={true} title="Log in" />
                <LoginForm mainClass={mainClass} />
            </div>
        </section>
    )
}

export default Login