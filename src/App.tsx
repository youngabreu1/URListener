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
            url: 'https://www.youtube.com/watch?v=-uxi6_5cFqw',
            isActive: true
        }

    ];

    const testAudioStream = (streamUrl: string) => {
        const sound = new Howl({
            src: [streamUrl],
            format: ['mp3', 'ogg', 'wav'],
            html5: true
        });
        sound.once('load', () => {
            console.log(`Stream de áudio ${streamUrl} está funcionando.`);
        });

        sound.once('loaderror', () => {
            console.log(`Stream de áudio ${streamUrl} não está funcionando.`);
        });
    };

    return (
        <div>
            <h1>Teste de Streams de Áudio</h1>
            {audioStreams.map((stream) => (
                <div key={stream.url}>
                    <button onClick={() => testAudioStream(stream.url)}>Testar Áudio - {stream.url}</button>
                </div>
            ))}
        </div>
    )
}

export default App;
