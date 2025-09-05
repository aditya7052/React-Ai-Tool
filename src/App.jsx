import { useId, useState } from 'react'
import { url } from './constants'
import Answers from './components/Answers'


function App() {

  const [question, setQuestion] = useState('');
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')))

  const id = useId()
  const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]

  }
  const askQuestion = async () => {

    if (localStorage.getItem('history')) {
      let history = JSON.parse(localStorage.getItem('history'))
      history = [question, ...history]
      localStorage.setItem('history', JSON.stringify(history))
      setRecentHistory(history)
    } else {
      localStorage.setItem('history', JSON.stringify([question]))
      setRecentHistory([question])
    }
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload)
    })
    response = await response.json();
    let dataString = response.candidates[0].content
      .parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim())
    // console.log(dataString)
    setResult([...result, { type: 'q', text: question }, { type: 'a', text: dataString }])
  }
  // console.log(result);
  console.log(recentHistory);



  return (
    <>
      <div className='grid grid-cols-5 h-screen  text-center '>
        <div className='col-span-1 bg-zinc-800  '>
          <ul>
            {
              recentHistory && recentHistory.map(item => (
                <li>{item}</li>
              ))
            }
          </ul>
        </div>
        <div className='col-span-4 p-10'>
          <div className='container h-100 overflow-auto'>
            <div className='text-zinc-300'>

              <ul>
                {
                  result.map((item, index) => (
                    <div key={index + Math.random()} className={item.type == 'q' ? 'flex justify-end' : ''}>
                      {
                        item.type == 'q' ?
                          <li key={index + Math.random()} className='text-right p-1  border-8 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit'><Answers ans={item.text} totalResult={1} index={index} /></li>
                          : item.text.map((ansItem, ansIndex) => (
                            <li key={ansIndex + Math.random()} className='text-left p-1'><Answers ans={ansItem} totalResult={item.length} index={ansIndex} type={item.type} /></li>

                          ))
                      }
                    </div>
                  ))
                }
              </ul>
              <ul>

                {/* {
                result && result.map((item , index)=>(

                  <li key={index + Math.random()} className='text-left p-1'><Answers ans={item} totalResult ={result.length} index={index} type={item.type} /></li>
                ))
              } */}
              </ul>
            </div>
          </div>
          <div className='bg-zinc-800 text-white w-1/2 m-auto p-1 pr-5 rounded-4xl h-16 border border-zinc-700 flex'>
            <input className='w-full h-full p-3 outline-none' value={question} onChange={(event) => setQuestion(event.target.value)} type="text" placeholder='Ask me Anything' />
            <button onClick={askQuestion}>Ask</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
