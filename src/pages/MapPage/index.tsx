import usePositionstore from '@/store/map/position';
import  {  useEffect  } from 'react'

declare global {
    interface Window {
      kakao: any;
    }
  }

const MapPage = () => {
    // 위치 쓸 것 같긴 한데 지금은 멈춘 상태
    const [myposition,setPosition] = usePositionstore((state) => [state.position, state.setPosition]);
    useEffect(() => {
        const mapScript = document.createElement("script");
    
        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=34b875f3f1bb52af7bfb9963e4dbc291&autoload=false&libraries=services`;
    
        document.head.appendChild(mapScript);
    
        mapScript.onload = () => {
            window.kakao.maps.load(() => {
              const container = document.getElementById("map");
              const options = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
              };
              const map = new window.kakao.maps.Map(container, options);
              if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const IocPosition = new window.kakao.maps.LatLng(lat, lon);

                    const marker = new window.kakao.maps.Marker({
                        position : IocPosition
                    });
                    setPosition({
                        lat : lat,
                        lon : lon,
                    })
                    marker.setMap(map);

                    // 지도 중심을 사용자의 현재 위치로
                    map.setCenter(IocPosition);
                    window.kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
                        const latlng = mouseEvent.latLng; 
                        marker.setPosition(latlng);
                        setPosition({
                            lat : latlng.Ma,
                            lon : latlng.La,
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
        
      return (
        <div
          id="map"
          className='w-full h-full'
        ></div>
      );

}

export default MapPage