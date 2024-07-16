import React from 'react'
import styled from 'styled-components'
import { useSelector} from 'react-redux'
import SmallCard from './SmallCard'
import Message from '../common/Message'

export default function SmallCartCard() {
  // get the cart content
      const {cart} = useSelector(store=> store.cart)

  return (
    <SmallCartContainer>
    {cart?.length === 0? <Message alertText='No items in your cart'/>:
      <>
      <h2 className=''>You have {cart?.length} items in your cart</h2>
      {cart?.map(x=> {
        return <SmallCard x={x} key={x?._id}/>
      })}
      </>
    }
    </SmallCartContainer>
  )
}

const SmallCartContainer = styled.div`
width:100%;
border:1px solid rgba(0,0,0,.1);
padding:2rem;
display:flex;
flex-direction:column;
gap:3.6rem;

  @media (min-width:780px) {
    display:none;
 }

 h2 {
  font-size:4rem;
  font-weight:normal;
  font-family: "Bebas Neue", sans-serif;
  color:var(--dark-1);
  text-align:center;
  line-height:1.5;
  border-bottom:1px solid rgba(0,0,0,.1);
  padding:1rem 0;
  text-transform:uppercase;
 }
`
