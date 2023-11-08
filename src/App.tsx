import React, { useState } from 'react';
import { Howl } from 'howler';

const App = () => {
    const audioStreams = [
        {
            id: 58,
            description: 'Ecletic',
            typeId: 1,
            url: 'https://stream.zeno.fm/kcxhm0cfepwvv',
            isActive: true
        },
        {
            id: 34,
            description: 'Blues 2',
            typeId: 1,
            url: 'https://stream.srg-ssr.ch/m/rsj/mp3_128',
            isActive: true
        },
        {
            id: 3,
            description: 'Playlist',
            typeId: 1,
            url: 'https://support.playlistsolutions.com/',
            isActive: true
        }
    
    ];

    const [stream, setStream] = useState('')
    var xibas:any
    const testAudioStream = async ()=> {
        
        const streamList = audioStreams.map((item) => {
            return new Promise(async (resolve) => {
                type formattedObject = {
                    name: string;
                    url: string;
                    isActive: boolean
                }
             
                const sound = new Howl({
                src: [item.url],
                format: ['mp3', 'ogg', 'wav'],
                html5: true
            });

            sound.once('loaderror', () => {
                let promiseError:formattedObject = ({
                    name: item.description,
                    url: item.url,
                    isActive: false
                })
                resolve(promiseError);
            });

            sound.once('load', () => {
                let promiseTop:formattedObject = ({
                    name: item.description,
                    url: item.url,
                    isActive: true
                })
                resolve(promiseTop);
            });

            
            })
        })
        
        const streamings = await Promise.all(streamList);
        console.log(streamings);
    
        };

    return (
        <div>
            <h1>Teste de Streams de Áudio</h1>
            <button onClick={testAudioStream}>butao</button>
            <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                Ta aqui:
                <p>{}</p>
            </div>
        </div>
    )
}

export default App;

{/* <div>
            <h1>Teste de Streams de Áudio</h1>
            {audioStreams.map((stream) => (
                <div key={stream.url}>
                    <button onClick={() => testAudioStream(stream.url)}>Testar Áudio - {stream.url}</button>
                </div>
            ))}
        </div> */}