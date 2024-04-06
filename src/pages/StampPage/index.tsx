import usePositionstore from '@/store/map/position';
import  {  useEffect  } from 'react'
import cloudMarker from '@/images/marker.png'

declare global {
    interface Window {
      kakao: any;
    }
  }

  type MarkerInfoProp = {
    lat : number,
    lon : number,
    content : Array<string>,
  }

  const MarkerInfo : Array<MarkerInfoProp> = [
    {lat: 37.547282739995964, lon: 127.06659525293044, content : [
        "안녕", "하이"
    ]},
    {lat: 37.54567075457188, lon: 127.06515670523791, content : [
        "안녕", "하이", "만나서"
    ]},
    {lat: 37.54457049768203, lon: 127.06701152072206 , content : [
        "안녕", "하이", "악담"
    ]},
    {lat: 37.547598261308345, lon: 127.0662899976558 , content : [
        "안녕", "하이", "어떻게"
    ]},
    {lat: 37.54689601243545, lon: 127.06533882833946, content : [
        "안녕", "하이"
    ]},
  ]

const StampPage = () => {
    // 위치 쓸 것 같긴 한데 지금은 멈춘 상태
    const [myposition] = usePositionstore((state) => [state.position]);
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
              const map = new window.kakao.maps.Map(container, options);
              MarkerInfo.forEach((info)=>{
                const imageSrc = cloudMarker, 
                imageSize = new window.kakao.maps.Size(69, 48), // 마커 이미지의 크기
                imageOption = {offset: new window.kakao.maps.Point(27, 69)};
                const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
                const markerPosition = new window.kakao.maps.LatLng(info.lat, info.lon);
                const marker = new window.kakao.maps.Marker({
                    position : markerPosition,
                    image: markerImage
                });
                marker.setMap(map);

                const infowindow = new window.kakao.maps.InfoWindow({
                    content : `<div style="padding:5px">${info.content[0]}</div>`
                });

                window.kakao.maps.event.addListener(marker, 'click',()=>{
                    infowindow.open(map,marker);
                });



              });
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

export default StampPage