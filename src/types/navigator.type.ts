import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Welcome: undefined;
    SignIn: undefined;
    SignUp: undefined;
    DestinationDetails: { destinationId: number }
    ReviewScreen: { destinationId: number },
    Tabs: undefined;
    SearchDestinationRatingScreen: undefined;
    ReviewDestinationScreen: undefined;
    DestinationReviewScreen: { provinceId: number }
    ProfileScreen: { userId: number }
    EditProfileScreen: undefined;
    ChatScreen: undefined;
    MessageScreen: { conversationId: number };
    SearchConversation: undefined;
};

export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
export type DestinationDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'DestinationDetails'>;
export type ReviewScreenScreenProps = NativeStackScreenProps<RootStackParamList, 'ReviewScreen'>;
export type TabsScreenProps = NativeStackScreenProps<RootStackParamList, 'Tabs'>;
export type SearchDestinationRatingScreenScreenProps = NativeStackScreenProps<RootStackParamList, 'SearchDestinationRatingScreen'>;
export type ReviewDestinationScreenScreenProps = NativeStackScreenProps<RootStackParamList, 'ReviewDestinationScreen'>;
export type DestinationReviewScreenScreenProps = NativeStackScreenProps<RootStackParamList, 'DestinationReviewScreen'>;
export type ProfileScreenScreenProps = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;
export type EditProfileScreenScreenProps = NativeStackScreenProps<RootStackParamList, 'EditProfileScreen'>;
export type ChatScreenScreenProps = NativeStackScreenProps<RootStackParamList, 'ChatScreen'>;
export type MessageScreenScreenProps = NativeStackScreenProps<RootStackParamList, 'MessageScreen'>;
export type SearchConversationScreenProps = NativeStackScreenProps<RootStackParamList, 'SearchConversation'>;

export type BottomTabParamList = {
    HomeScreen: undefined;
    SearchScreen: undefined;
    PlanScreen: undefined;
    RatingScreen: undefined;
    AccountScreen: undefined;
}
