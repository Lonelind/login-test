import React from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter, WithRouterProps } from 'next/router';

import { connect } from 'react-redux';

import { changeMap } from 'actions/map';
import MapWrapper from './components/MapWrapper';

// Native styles for OpenLayers GUI
import 'ol/ol.css';

const DEFAULT_ZOOM = 15;

class MapContainer extends React.Component {
    static propTypes = {
        map: PropTypes.shape({
            zoom: PropTypes.number,
            coords: PropTypes.arrayOf(PropTypes.number),
        }).isRequired,
        triggerMapChange: PropTypes.func.isRequired,
        ...WithRouterProps,
    };

    view = null;

    map = null;

    easeOut = null;

    fromLonLat = null;

    async componentDidMount() {
        const {
            map: { coords, zoom },
            router: {
                query: {
                    lat,
                    lng,
                    z,
                },
            },
            triggerMapChange,
        } = this.props;

        // OpenLayers library works only on client side
        const { default: MapC } = await import('ol/Map');
        const { default: View } = await import('ol/View');
        const { easeOut } = await import('ol/easing');
        const { default: TileLayer } = await import('ol/layer/Tile');
        const { fromLonLat } = await import('ol/proj');
        const { default: OSM } = await import('ol/source/OSM');

        // Some utility functions from OpenLayers are needed later
        this.easeOut = easeOut;
        this.fromLonLat = fromLonLat;

        const mapInitialParams = {
            center: [
                lng ? parseFloat(lng) : coords[0],
                lat ? parseFloat(lat) : coords[1],
            ],
            zoom: z ? parseFloat(z) : zoom,
        };

        if (!lng && !lat && !z) {
            navigator.geolocation.getCurrentPosition(({
                coords: {
                    longitude,
                    latitude,
                },
            }) => {
                const center = this.fromLonLat([ longitude, latitude ]);

                this.changeQueryParams(center[1], center[0], DEFAULT_ZOOM);

                this.view.animate({
                    center,
                    duration: 1000,
                    zoom: DEFAULT_ZOOM,
                    easing: this.easeOut,
                });
            });
        }

        this.view = new View(mapInitialParams);

        this.map = new MapC({
            target: 'map',
            layers: [
                new TileLayer({
                    preload: 4,
                    source: new OSM(),
                }),
            ],
            loadTilesWhileAnimating: true,
            view: this.view,
        });

        this.map.on('moveend', () => {
            const newZoom = this.view.getZoom();
            const newCoords = this.view.getCenter();

            triggerMapChange({
                zoom: newZoom,
                coords: newCoords,
            });

            this.changeQueryParams(newCoords[1], newCoords[0], newZoom);
        });
    }

    shouldComponentUpdate({ map: { coords = [], zoom } }) {
        const oldCoords = this.view.getCenter();
        const oldZoom = this.view.getZoom();

        if (coords[0] !== oldCoords[0] || coords[1] !== oldCoords[1] || zoom !== oldZoom) {
            this.view.animate({
                center: coords,
                duration: 1000,
                zoom,
                easing: this.easeOut,
            });
        }

        return false;
    }

    changeQueryParams = (lat, lng, z) => {
        const { router: { pathname } } = this.props;
        const href = `${pathname}?lat=${lat}&lng=${lng}&z=${z}`;

        Router.replace(href, href, { shallow: true });
    };

    render() {
        return (
            <MapWrapper id="map" />
        );
    }
}

export default connect(
    ({ map }) => ({ map }),
    (dispatch) => ({
        triggerMapChange: (map) => dispatch(changeMap(map)),
    }),
)(withRouter(MapContainer));
