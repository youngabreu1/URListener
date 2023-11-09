import React, { useState } from 'react';
import { Howl } from 'howler';

type Stream =
    {
        id: number,
        description: string,
        typeId: number,
        url: string,
        isActive: boolean
    }

type PromiseStream = {
    name: string,
    url: string,
    isActive: boolean
}

const App = () => {
    const audioStreams: Stream[] = [
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
    const [loading, setLoading] = useState<boolean>(false);

    const [stream, setStream] = useState<PromiseStream[]>([
    ])
    const testAudioStream = async () => {
        setLoading(true)
        const streamList = audioStreams.map((item): Promise<PromiseStream> => {
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
                    let promiseError: PromiseStream = {
                        name: item.description,
                        url: item.url,
                        isActive: false
                    }
                    resolve(promiseError);
                });

                sound.once('load', () => {
                    let promiseTop: formattedObject = ({
                        name: item.description,
                        url: item.url,
                        isActive: true
                    })
                    resolve(promiseTop);
                });


            })
        })

        const streamings = await Promise.all(streamList)
        console.log(streamings)
        setLoading(false)
        setStream(streamings)
    };

    function playSound(url:string){
        const sound = new Howl({
            src: [url],
            format: ['mp3', 'ogg', 'wav'],
            html5: true
        });
        sound.play()
    }

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
             <div style={{display: 'flex', alignItems:'center',}}>
                    {
                    loading?
                    <div className='loading'>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div></div>
                    :
                    loading 
                }
                </div>
            <div>
                <h1>Teste de Streams de Áudio</h1>
            </div>
            <div style={{ width: '100%', maxWidth: '10%' }}>
                <button style={{ fontFamily: 'Noto Sans', width: '100%', padding: '10px', marginBottom: '20px' }} onClick={testAudioStream}>Clique Aqui!</button>
            </div>
            <div style={{ display: 'flex', width: '450px', height: '250px', backgroundColor: '#333333', boxSizing: 'border-box', borderRadius: '1.5ch', border: '2px solid #404040' }}>
                <div style={{ fontFamily: 'Noto Sans', paddingLeft: '2px', width: '100%',padding: '10px' }}>
                    
                    {stream?.map((item, index) => {
                        return (
                            <div key={index} style={{ display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                <div>
                                    {
                                    loading==false?
                                    item.name:
                                    loading
                                    }
                                </div>
                                <div>
                                    {
                                        item.isActive && loading==false
                                            ?
                                            <div className="activeLoad" onClick={() => playSound(item.url)} style={{ padding: ' 10px', cursor:'pointer'} }>

                                            </div>
                                            :
                                            <div className="inactiveLoad" style={{ padding: ' 10px' }}></div>
                                    }
                                </div>
                            </div>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default App;

