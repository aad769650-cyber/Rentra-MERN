import React from 'react'
import Islamabad from '../regions/Islamabad'
import Lahore from '../regions/Lahore'
import Dubai from '../regions/Dubai'
import Murre from '../regions/Muree'
import Pindi from '../regions/Pindi'
import PopularLinks from '../pages/PopularLink'
import Footer from './Footer'
import FAQ from './FAQs'

export const Home = () => {
  return (
<section className='p-2'>

<Islamabad></Islamabad>
<Lahore></Lahore>
<Dubai></Dubai>
<Murre></Murre>
<Pindi></Pindi>


<PopularLinks></PopularLinks>
<FAQ></FAQ>

</section>
  )
}
