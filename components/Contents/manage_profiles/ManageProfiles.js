import UserProfileData from "@app/master/user_profiles/UserProfileData";
import Button from "@components/Button/Button"
import ProfileItem from "@components/ProfileItem/ProfileItem";
import tw from "@utils/Tailwind";

function ManageProfiles({ onSelectProfile, onManageProfile, onAddProfile }) {
  return (
    <div
      className={tw(
        "flex flex-col items-center justify-center",
        "h-full w-full",
        "overflow-hidden"
      )}
    >

      <div className={tw(
        "flex flex-col items-center justify-center",
        "animate-landing-loaded"
      )}>
        <div className="bg-[#131313] mb-10">
          <div
            className={tw(
              "text-[3.5vw] lg:text-[35px]",
              "text-white text-center"
            )}
          >
            Manage Profiles:
          </div>
          <ul
            className={tw(
              "flex flex-row items-center justify-center",
              "space-x-[2vw] mt-[2em] flex-wrap"
            )}
          >
            {
              UserProfileData.map(item => (
                <ProfileItem
                  key={item.profileName}
                  profileName={item.profileName}
                  profileImage={item.profileImage}
                  isLocked={item.isLocked}
                  onClick={() => onSelectProfile(item)}
                  showEditLayout={true}
                />
              ))
            }
            <ProfileItem
              profileName="Add Profile"
              isLocked={false}
              isAddProfile={true}
              onClick={onAddProfile}
            />
          </ul>
        </div>
        <div>
          <Button
            variant="contained"
            buttonText="DONE"
            onClick={onManageProfile}
          />
        </div>
      </div>
    </div>
  )
}

export default ManageProfiles
