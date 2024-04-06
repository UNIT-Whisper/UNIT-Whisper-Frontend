import usePositionstore from '@/store/map/position';
import  {  useEffect, useRef, useState  } from 'react'
import MapBtnWrapper from '@/images/mapBtnWrapper.png';
import cloudBtn from '@/images/marker.png';
import useCheckCloudStore from '@/store/chat/chatCollect';
import { sendCloud } from '@/apis/sendCloud';
import { useNavigate } from 'react-router-dom';
import useCloudStore from '@/store/chat/chat';

declare global {
    interface Window {
      kakao: any;
    }
  }

const MapPage = () => {
    const [map, setMap] = useState(null);
    const [click, setClick] = useState(0);
    const markerRef = useRef<window.kakao.maps.Marker | null>(null);
    // 위치 쓸 것 같긴 한데 지금은 멈춘 상태
    const [myposition,setmyPosition] = usePositionstore((state) => [state.position, state.setPosition]);
    const [clouds, resetCheckCloud] = useCheckCloudStore((state)=>[state.clouds, state.resetClouds]);
    const [resetCloud] = useCloudStore((state)=>[state.resetClouds]);
    const navigate = useNavigate();
    const text = clouds[0].text;
    useEffect(() => {
        const mapScript = document.createElement("script");
    
        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=34b875f3f1bb52af7bfb9963e4dbc291&autoload=false&libraries=services`;
    
        document.head.appendChild(mapScript);
    
        mapScript.onload = () => {
            window.kakao.maps.load(() => {
              const container = document.getElementById("map");
              const options = {
                center: new window.kakao.maps.LatLng(myposition.lat, myposition.lon),
                level: 3,
              };
              const mapInstance = new window.kakao.maps.Map(container, options);
              setMap(mapInstance);
              if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const IocPosition = new window.kakao.maps.LatLng(lat, lon);

                    const marker = new window.kakao.maps.Marker({
                        position : IocPosition
                    });
                    setmyPosition({
                        lat : lat,
                        lon : lon,
                    })
                    marker.setMap(mapInstance);
                    markerRef.current = marker;

                    // 지도 중심을 사용자의 현재 위치로
                    mapInstance.setCenter(IocPosition);
                    setMap(mapInstance);
                    window.kakao.maps.event.addListener(mapInstance, 'click', function(mouseEvent) {
                        const latlng = mouseEvent.latLng; 
                        marker.setPosition(latlng);
                        setClick(click+1);
                        setmyPosition({
                            lat : latlng.getLat(),
                            lon : latlng.getLng(),
                        })
                      });
                },(error) => {
                    console.log(error);
                });
              }else{
                alert("에러 발생")
              }

            });
          };
          return () => {
            // 컴포넌트가 언마운트 될 때 스크립트 태그 제거
            document.head.removeChild(mapScript);
          };
        }, []);
        // 마커 이미지 바뀌는 로직
        const handleChangeMarker = async () => {
            // 여기다가 axios 연결을 지어야 하고... 
            const response = await sendCloud(sessionStorage.getItem('accessToken') as string,text,myposition.lat, myposition.lon);
            if(response.code == 0){
                if (markerRef.current && map && window.kakao && window.kakao.maps) {
                    const imageSrc = cloudBtn,
                    imageSize = new window.kakao.maps.Size(69, 48);
                                      
                    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                                    
                    markerRef.current.setImage(markerImage);
                    window.kakao.maps.event.removeListener(map, 'click');
                    }
                alert("구름이 저장되었습니다.");
                setClick(-999);
                resetCheckCloud();
                resetCloud();
                setTimeout(() => {
                    navigate("/chat", { replace: true });
                  }, 2000);
            }else{
                alert("에러가 일어났습니다");
            }
            }
        
      return (
        <div className='relative w-full h-full'>
                <div
          id="map"
          className='w-full h-full'
        ></div>
        <div
        style={{
            backgroundImage : `url(${MapBtnWrapper})`,
            backgroundSize: 'contain', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}
        className='absolute bottom-0 w-full max-w-[500px] h-[329px] z-10 flex flex-col justify-center items-center'
        >
            <img src={cloudBtn} alt='구름 버튼' className='h-[115px] w-[164px] absolute left-[35%] top-[5%]'/>
            <div
  className="text-center text-[28px] font-bold text-[#2D3748] font-Jalnan mt-8 mb-2"
  >
    속삭임
  </div>
  <button className='p-3 inline-flex gap-1 justify-center items-center rounded text-white font-Pretendard font-semibold'
    style={{
        backgroundColor : click > 0 ? '#0096FF': '#A0AEC0'
    }}
    disabled={click != 0 ? false : true}
    onClick={handleChangeMarker}
  >원하는 지역에 던지기</button>
        </div>
        </div>
      );

}

export default MapPage