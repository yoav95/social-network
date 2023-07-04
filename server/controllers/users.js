import User from "../models/User.js";

// READ
export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.json(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await user.findById(friendId);
    if (user.friends.includes(friendId)) {
      //if the friend the user want to delete is really his friend
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      //otherwise - he is not a friend then we add him
      user.friends.push(friendId);
      friend.friends.push(id);

      await user.save();
      await friend.save();

      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return {
            _id,
            firstName,
            lastName,
            occupation,
            location,
            picturePath,
          };
        }
      );
      res.status(200).json(formattedFriends);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTI5NDY5ZmEzM2RiOGEzZDZkOTljOCIsImlhdCI6MTY4ODM3NjcyNH0.VNZkTMifeqBtc7E95ktiY2zqPfiEurP3AyDk9120bjs",
//     "user": {
//         "_id": "64a29469fa33db8a3d6d99c8",
//         "firstName": "Yoav",
//         "lastName": "Amenou",
//         "email": "yoav@asd.com",
//         "password": null,
//         "picturePath": "",
//         "friends": [
//             ""
//         ],
//         "location": "asdkl3r",
//         "occupation": "web developer",
//         "viewedProfile": 6518,
//         "impressions": 8354,
//         "createdAt": "2023-07-03T09:27:05.803Z",
//         "updatedAt": "2023-07-03T09:27:05.803Z",
//         "__v": 0
//     }
// }
