import HeaderMain from "../Components/HeaderMain/HeaderMain"
import ProfileComp from "../Components/Profile/Profile"

const Profile = ({ user }) => {
  console.log("user1", user);
  return(
    <>
      <HeaderMain />
      <ProfileComp user={user} />
    </>
  )
};

export default Profile;