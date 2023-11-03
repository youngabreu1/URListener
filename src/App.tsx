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

    const testAudioStream = () => {
        var urlChecked:any = []
        audioStreams.map((stream) => {
            const sound = new Howl({
                src: [stream.url],
                format: ['mp3', 'ogg', 'wav'],
                html5: true
            });
            sound.once('load', () => {
                console.log(`Stream de áudio ${stream.url} está funcionando.`);
                setStream(`Stream de áudio ${stream.url} está funcionando.`)
                urlChecked = {
                    name: stream.description,
                    url: stream.url,
                    active: true
                }
            });

            sound.once('loaderror', () => {
                console.log(`Stream de áudio ${stream.url} não está funcionando.`);
                <p>Stream de áudio ${stream.url} está funcionando.</p>
            });
            
        })
    };

    return (
        <div>
            <h1>Teste de Streams de Áudio</h1>
            <button onClick={testAudioStream}>butao</button>
            <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                Ta aqui:
                <p>{stream}</p>
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