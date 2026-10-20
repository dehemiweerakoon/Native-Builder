import '@/global.css';
import { Text, View, Image, FlatList } from "react-native";
import { styled } from 'nativewind';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import images from "@/constants/images"
import {HOME_BALANCE, HOME_SUBSCRIPTIONS, HOME_USER, UPCOMING_SUBSCRIPTIONS} from '@/constants/data';
import { icons } from '@/constants/icon';
import { formatCurrency } from '../../../lib/utils';
import dayjs from 'dayjs';
import ListHeading from '../../../components/ListHeading';
import UpcomingSubscriptionCard from '../../../components/UpcomingSubscriptionCard';
import SubscriptionCard from '../../../components/SubscriptionCard';
import {useState} from "react";

const SafeAreaView = styled(RNSafeAreaView);




export default function App() {

    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string| null>(null);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        data={HOME_SUBSCRIPTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubscriptionCard
            {...item}
            expanded={expandedSubscriptionId === item.id}
            onPress={() => setExpandedSubscriptionId((currentId) =>
              currentId === item.id ? null : item.id
            )}
          />
        )}
        extraData={expandedSubscriptionId}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListHeaderComponent={
          <>
      <View className='home-header'>
        <View className='home-user'>
          <Image source={images.avatar} className='home-avatar' />
          <Text className='home-user-name'>{HOME_USER.name}</Text>
        </View>

        <Image source={icons.add} className="home-add-icon" />
      </View>

      <View className='home-balance-card'>
        <Text className='home-balance-label'>Balance</Text>
        <View className='home-balance-row'>
          <Text className='home-balance-amount'>
            {formatCurrency(HOME_BALANCE.amount)}
          </Text>
          <Text className='home-balance-date'>{
            dayjs(HOME_BALANCE.nextRenewalDate).format('MM/DD')}</Text>
        </View>
      </View>

      <View>
        <ListHeading title="Upcoming" />
        <FlatList
          horizontal
          data={UPCOMING_SUBSCRIPTIONS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <UpcomingSubscriptionCard {...item} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 8 }}
          ListEmptyComponent={<Text className='home-empty-state'>No Upcoming Renewals yet</Text>}
        />
      </View>

      <View>
        <ListHeading title="All Subscriptions" />
      </View>
          </>
        }
      />
    </SafeAreaView>
  );
}
/*
      {/* <Link href="/(auth)/sign-up" className='mt-4 font-sans-bold rounded bg-primary text-white
      p-4'>Go to Sign Up</Link> */

/* <Link href={{
  pathname: '/subscriptions/[id]',
  params: { id: 'spotify' },
}}>
  Spotify Subscription
</Link>

        <SubscriptionCard
            expanded={expandedSubscriptionId === HOME_SUBSCRIPTIONS[0].id}
            onPress={()=>
                setExpandedSubscriptionId((currentId)=>
                    (currentId=== HOME_SUBSCRIPTIONS[0].id? null: HOME_SUBSCRIPTIONS[0].id))}
            {...HOME_SUBSCRIPTIONS[0]} />

*/
