import usePositionstore from '@/store/map/position';
import  {  ReactNode, useCallback, useEffect, useState  } from 'react'
import cloudMarker from '@/images/marker.png'
import useStampstore, { stampType } from '@/store/map/stamp';
import dayjs from 'dayjs'
import Calendar from '@/svg/calendar.svg?react';
import Time from '@/svg/time.svg?react';
import Location from '@/svg/location.svg?react';

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
    const [stamp,  setStamp] = useStampstore((state)=>[state.stamp, state.setStamp]);
    const [open, setOpen] = useState(false);
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


                window.kakao.maps.event.addListener(marker, 'click',()=>{
                    setStamp({
                        lat : info.lat,
                        lon : info.lon,
                        date : new Date(),
                        content : info.content,
                    });
                    setOpen(true);
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
        <div className='relative w-full h-full'>
                <div
          id="map"
          className='w-full h-full'
        ></div>
        {open && <MarkInfo info={stamp} />}
        </div>
      );

}

const MarkInfo = ({info} : {info : stampType}) => {
    const InfoBtn = useCallback(({ children }: { children: ReactNode }) => {
        return (
          <div className="flex justify-center items-center gap-1.5 py-1.5 px-2 font-semibold font-Pretendard text-xs text-[#4A5568] bg-[#EDF2F7] rounded-md">
            {children}
          </div>
        );
      }, []);
    return(
        <div className='absolute bottom-0 flex w-full h-[350px] py-9 px-6 flex-col items-start gap-5 bg-white z-50'
        style={{
            "borderRadius" : "20px 20px 0px 0px",
        }}
        >
        <div className='py-4 w-full border-b-[1px] border-solid border-b-[#E2E8F0]'>
        <img src={cloudMarker} alt='정보로고' className='w-[70px] h-12'/>
        <div className=' font-Pretendard text-lg font-bold'>구름 내용 보기</div>
        <div className='flex gap-[9px]'>
            <InfoBtn>
                <Calendar />
                <div>{dayjs(info.date).format("YYYY.MM.DD")}</div>
            </InfoBtn>
            <InfoBtn>
                <Time />
                <div>21:15</div>
            </InfoBtn>
            <InfoBtn>
                <Location />
                <div>서울특별시 성동구 아차산로 17길 48</div>
            </InfoBtn>
        </div>
        </div>
        <div className='overflow-y-scroll whitespace-pre-wrap'>
        {info.content.map((e, i)=>{
            return(
    <div key={i} className='mb-1'>{e}</div>
            )
        })}
        </div>
      </div>
    )
}

export default StampPage