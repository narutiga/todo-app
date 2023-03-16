/** @package */
export const SignInButton = () => {
  return (
    <form method="get" action="http://localhost:8080/api/v1/auth/google">
      <button type="submit">Login</button>
    </form>
  );
};
