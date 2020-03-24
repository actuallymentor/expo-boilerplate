import React from 'react'
import { Text } from 'react-native'
import { Container, Header } from './common/generic'

export default f => <Container>
	<Header back={ f => f } title='Home' subtitle='The best place to be' />
	<Text>Hello</Text>
</Container>