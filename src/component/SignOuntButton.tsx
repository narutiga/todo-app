/** @package */
export const SignOutButton = () => {
  return (
    <form
      method="post"
      action="http://localhost:8080/api/v1/auth/google/logout"
    >
      <button type="submit">Logout</button>
    </form>
  );
};
