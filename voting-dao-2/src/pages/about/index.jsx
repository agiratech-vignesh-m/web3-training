import React from 'react';
import HomeContainer from '../../components/cards/homecontainer';
import Overlay from '../../components/cards/overlay';
import Navigationbar from '../../container/layout/navigationbar';

const About = () => {
  return (
        <>
          <Navigationbar />
          <Overlay />
          <HomeContainer />
    </>
  )
}

export default About