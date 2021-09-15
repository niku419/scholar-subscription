import React from 'react'
import axios from 'axios'
import useInterval from 'react-useinterval';

export default function Bot() {
  // const emoji = ['\xF0\x9F\x98\x8A','\xF0\x9F\x98\x83','\xF0\x9F\x98\x89','\xF0\x9F\x98\x8B','\xF0\x9F\x98\x8C','\xF0\x9F\x98\x8D','\xF0\x9F\x98\x98','\xF0\x9F\x98\x9A','\xE2\x9D\xA4']
  // var randomNumber = Math.floor(Math.random() * (emoji.length))
  var today = new Date()
  var hours = today.getHours()
  var minutes = today.getMinutes()
  // console.log(emoji[randomNumber])
  const message = `Happy ${hours-1} %2b 143 hour Hakku baby`
  const botToken = "bot1478457868:AAFwOhJTt5ypL2y6FmbEDQJR0FoDHS-Za4U"
  const chatId = "931515068"
  function useThis() {
    if(minutes === 43){
      axios.get(`https://api.telegram.org/${botToken}/sendMessage?chat_id=${chatId}&text=${message}`)
      return true
    }
  }
  useInterval(useThis, 1000);
  return (
    <div>
      yo
    </div>
  )
}
