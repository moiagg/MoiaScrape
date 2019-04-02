import Template from "../src/components/Template";
const Profile = ({ user }) => (
  <Template className={"container mx-auto mt-5 h-100"}>
    <iframe
      src={`https://player.twitch.tv/?channel=${user}`}
      frameborder="0"
      allowfullscreen="true"
      scrolling="no"
      height="378"
      width="620"
    />
  </Template>
);
Profile.getInitialProps = async ({ query }) => {
  return { user: query.user };
};
export default Profile;
