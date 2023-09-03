import React from 'react'
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

const Map = () => {
    return (
        <MapContainer center={[6.4420622, 3.5177895]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[6.4420622, 3.5177895]}>
                <Popup>
                    Where to Find me
    </Popup>
            </Marker>
            <div className='map-content'>
                <h3 className='switch__color'>Timilehin</h3>
                <span>ADE.T</span>
                <br />
                <span>Location: Lagos: Nigeria</span>
                <br />
                <span>Email: timadewale1@gmail.com</span>
            </div>
</MapContainer>
    )
}

export default Map