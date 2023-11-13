import { useState } from 'react';
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
    id: number,
    name: string,
    url: string,
    isActive: boolean
}

var state: Howl | null = null


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
    const [isPlaying, setIsPlaying] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMusic, setLoadingMusic] = useState<boolean>(false);
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
                        id: item.id,
                        name: item.description,
                        url: item.url,
                        isActive: false
                    }
                    resolve(promiseError);
                });

                sound.once('load', () => {
                    let promiseTop: PromiseStream = ({
                        id: item.id,
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



    function playSound(item: PromiseStream) {
        setLoadingMusic(true)
        const sound = new Howl({
            src: [item.url],
            format: ['mp3', 'ogg', 'wav'],
            html5: true
        });

        if (state != null) {
            state.stop()
            state = sound
        }
        else {
            state = sound
        }
        sound.play()
        setIsPlaying(item.id)
        setLoadingMusic(false)
    }

    function stopSound(item: PromiseStream) {
        const sound = new Howl({
            src: [item.url],
            format: ['mp3', 'ogg', 'wav'],
            html5: true
        });

        if (state != null) {
            state.stop()
            state = sound
        }
        else {
            state = sound
        }
        sound.stop
        setIsPlaying(0)
    }

    const LoadingCheckStreams = () => {
        return (
            <div className='loading'>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        )
    }

    const LoadingPlayStreams = () => {
        return (
            <div className="loadingsound">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            
            <div>
                <h1>Teste de Streams de Áudio</h1>
            </div>
            <div style={{ width: '100%', maxWidth: '10%' }}>
                <button style={{ fontFamily: 'Noto Sans', width: '100%', padding: '10px', marginBottom: '20px' }} onClick={testAudioStream}>Clique Aqui!</button>
            </div>
            <div style={{ display: 'flex', width: '450px', height: '250px', backgroundColor: '#333333', boxSizing: 'border-box', borderRadius: '1.5ch', border: '2px solid #404040' }}>
                <div style={{ fontFamily: 'Noto Sans', paddingLeft: '2px', width: '100%', padding: '10px' }}>

                    {stream?.map((item, index) => {
                        return (
                            <div key={index} style={{ display: 'flex', width: '90%', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex' }}>
                                    {
                                        item.isActive && loading == false
                                            ?
                                            <div className="activeLoad" style={{ padding: ' 10px'}}>

                                            </div>
                                            :
                                            <div className="inactiveLoad" style={{ padding: ' 10px' }}></div>
                                    }
                                    <div>
                                        {
                                            loading == false ?
                                                item.name :
                                                loading
                                        }
                                    </div>
                                </div>

                                <div>
                                    <div className='container' onClick={() => playSound(item.url)} >
                                        <a href='#' className='playBut'>


                                            <svg version="1.1"
                                                xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" xmlns: a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                                                x="0px" y="0px" width="35px" height="35px" viewBox="0 0 213.7 213.7" enable-background="new 0 0 213.7 213.7"
                                                xml: space="preserve">

                                                <polygon className='triangle' id="XMLID_18_" fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="
	73.5,62.5 148.5,105.8 73.5,149.1 "/>

                                                <circle className='circle' id="XMLID_17_" fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" cx="106.8" cy="106.8" r="103.3" />
                                            </svg>



                                        </a>
                                    </div>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                {
                    loading &&
                    <LoadingCheckStreams />
                }

            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                {
                    loadingMusic &&
                    <LoadingPlayStreams />
                }
            </div>
        </div>
    )
}

export default App;

