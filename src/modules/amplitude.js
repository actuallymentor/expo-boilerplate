import { AMPLITUDE_APIKEY } from 'react-native-dotenv'
import * as Amplitude from 'expo-analytics-amplitude'

const AmplitudeInit = f => {
	if( AMPLITUDE_APIKEY ) Amplitude.initialize( AMPLITUDE_APIKEY )
}

export default AmplitudeInit