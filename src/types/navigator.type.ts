import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TLocation, TLocationGet, TRatingStatistic } from './location.type';
import { TCity } from './city.type';

export type RootStackParamList = {
    Welcome: undefined;
    SignIn: undefined;
    SignUp: { city?: TCity };
    DestinationDetails: { destinationId: number };
    ReviewScreen: { destinationId: number, ratingStatistic: TRatingStatistic, ratingAverage: number, locationName: string };
    Tabs: undefined;
    SearchDestinationRatingScreen: undefined;
    ReviewDestinationScreen: { location: TLocation };
    PlanDetails: { planId: number };
    UpdatePlan: { plantId: number };
    DestinationReviewScreen: { provinceId: number, provinceName: string }
    ProfileScreen: { userId: number }
    EditProfileScreen: {city?: TCity};
    ChatScreen: undefined;
    MessageScreen: { conversationId: number, roomName: string };
    SearchConversation: undefined;
    GroupDetailScreen: { groupId: number };
    PostDetailScreen: { postId: number };
    NewPostScreen: { locations: TLocation[] };
    SearchCityScreen: { type: 'signup' | 'edit'};
    CreateChatRoom: undefined;
    AddCityPlan: { planId: number };
    MapViewScreen: { locations: TLocationGet[] };
};

export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
export type DestinationDetailsScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'DestinationDetails'
>;
export type ReviewScreenScreenProps = NativeStackScreenProps<RootStackParamList, 'ReviewScreen'>;
export type TabsScreenProps = NativeStackScreenProps<RootStackParamList, 'Tabs'>;
export type PlanDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'PlanDetails'>;
export type UpdatePlanScreenProps = NativeStackScreenProps<RootStackParamList, 'UpdatePlan'>;
export type SearchDestinationRatingScreenScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'SearchDestinationRatingScreen'
>;
export type ReviewDestinationScreenScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'ReviewDestinationScreen'
>;
export type DestinationReviewScreenScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'DestinationReviewScreen'
>;
export type ProfileScreenScreenProps = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;
export type EditProfileScreenScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'EditProfileScreen'
>;
export type ChatScreenScreenProps = NativeStackScreenProps<RootStackParamList, 'ChatScreen'>;
export type MessageScreenScreenProps = NativeStackScreenProps<RootStackParamList, 'MessageScreen'>;
export type GroupDetailScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'GroupDetailScreen'
>;
export type PostDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PostDetailScreen'>;
export type NewPostScreenProps = NativeStackScreenProps<RootStackParamList, 'NewPostScreen'>;
export type SearchConversationScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'SearchConversation'
>;
export type SearchCityScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'SearchCityScreen'
>;

export type CreateChatRoomScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'CreateChatRoom'
>;
export type SearchCityScreenScreenProps = NativeStackScreenProps<RootStackParamList, 'SearchCityScreen'>;
export type AddCityPlanProps = NativeStackScreenProps<RootStackParamList, 'AddCityPlan'>;
export type MapViewScreenProps = NativeStackScreenProps<RootStackParamList, 'MapViewScreen'>;

export type BottomTabParamList = {
    HomeScreen: undefined;
    SearchScreen: undefined;
    PlanScreen: undefined;
    RatingScreen: undefined;
    AccountScreen: undefined;
};
