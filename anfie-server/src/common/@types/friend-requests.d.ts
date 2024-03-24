type TFriendRequestStatus = 'accepted' | 'pending' | 'rejected';
type TCancelFriendRequestParams = {
	id: string;
	senderId: string;
};
