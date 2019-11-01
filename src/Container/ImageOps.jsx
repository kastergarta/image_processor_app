import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default class ImageOpsContainer extends React.Component {

  render() {

        console.log("Transformations : ", this.state.transforms);

        return (
            <Container  maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                       <Card>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Input image
                                </Typography>
                                <Image sign_url={true} publicId="leena" cloudName="rakesh111" >
                                </Image>
                            </CardContent>
                       </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Output Image
                                </Typography>
                                <Image publicId="leena" cloudName="rakesh111" >
                                    {this.getTransformations()}
                                </Image>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Box color="text.primary">
                                    <Typography paragraph={true} variant="h5" align="left" component="h5">
                                        R-G-B Controls
                                    </Typography>

                                    {this.getRBBCons().map((color) => {
                                        return (
                                            <SliderComponent getSliderValue={(key) => this.getSliderValue(key, "rgb")} default={0} min={-100} max={100} keyLabel={color.key} keyValue={color.value}
                                                updateColorValue={(e, value, key) => this.updateColorValue(e, value, key)}  />
                                        )
                                    })}

                                    <Button variant="contained" align="left" onClick={() => this.resetFilters(["red", "green", "blue"])} color="primary">
                                        Reset
                                    </Button>

                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card item xs={6}>
                            <CardContent>
                                <Box color="text.primary">
                                    <Typography paragraph={true} variant="h5" align="left" component="h5">
                                        R-G-B Based Filters
                                    </Typography>

                                    <Button variant="contained" align="left" onClick={() => this.createRGBEffect("all_blue")} >
                                        Fill Blue
                                    </Button>
                                    <Button variant="contained" align="left" onClick={() => this.createRGBEffect("all_red")} >
                                        Fill Red
                                    </Button>
                                    <Button variant="contained" align="left" onClick={() => this.createRGBEffect("all_green")}>
                                        Fill Green
                                    </Button>
                                    <Button variant="contained" align="left" onClick={() => this.resetFilters(["red", "green", "blue"])} color="primary">
                                        Reset
                                    </Button>

                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Box color="text.primary">
                                    <Typography paragraph={true} variant="h5" align="left" component="h5">
                                        H-S-V Controls
                                    </Typography>

                                    {this.getHSVCons().map((color) => {
                                        return (
                                            <SliderComponent getSliderValue={(key) => this.getSliderValue(key, "hsv")} default={0} min={-100} max={100} keyLabel={color.key} keyValue={color.value}
                                                updateColorValue={(e, value, key) => this.updateColorValue(e, value, key)}  />
                                        )
                                    })}

                                    <Button variant="contained" align="left" onClick={() => this.resetFilters(["hue", "saturation", "brightness"])} color="primary">
                                        Reset
                                    </Button>

                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card item xs={6}>
                            <CardContent>
                                <Box color="text.primary">
                                    <Typography paragraph={true} variant="h5" align="left" component="h5">
                                        H-S-V Based Filters
                                    </Typography>

                                    <Button variant="contained" align="left" onClick={() => this.createHSVEffect("grayscale")} >
                                        Gray Scale
                                    </Button>
                                    <Button variant="contained" align="left" onClick={() => this.createHSVEffect("sepia")} >
                                        Sepia
                                    </Button>
                                    <Button variant="contained" align="left" onClick={() => this.resetFilters(["hue", "saturation", "brightness"])} color="primary">
                                        Reset
                                    </Button>

                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={12}>
                        <Card item xs={6}>
                            <CardContent>
                                <Box color="text.primary">
                                    <Typography paragraph={true} variant="h5" align="left" component="h5">
                                        Advance Filters By Cloudinary
                                    </Typography>

                                    <Button variant="contained" align="left" onClick={() => this.createAdvanceEffects("cartoon")} >
                                        Cartoonify
                                    </Button>
                                    <Button variant="contained" align="left" onClick={() => this.createAdvanceEffects("vignette")} >
                                        Vignette
                                    </Button>

                                    <Button variant="contained" align="left" onClick={() => this.createAdvanceEffects("oil_painting")} >
                                        Oil Painting
                                    </Button>

                                    <Button variant="contained" align="left" onClick={() => this.createAdvanceEffects("vibrance")} >
                                        vibrance
                                    </Button>

                                    <Button variant="contained" align="left" onClick={() => this.resetFilters(["vignette", "cartoonify", "vibrance", "oil_paint"])} color="primary">
                                        Reset
                                    </Button>

                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
        )
    }
}

class SliderComponent extends React.Component {

    valuetext(value) {
        return `${value}°C`;
    }

    render() {
        console.log(this.props.getSliderValue(this.props.keyValue));

        return (
            <div>
                <Typography id="discrete-slider" align="left" gutterBottom>
                    {this.props.keyLabel}
                </Typography>
                <Slider
                    defaultValue={this.props.default}
                    getAriaValueText={this.valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    value={this.props.getSliderValue(this.props.keyValue)}
                    marks
                    min={this.props.min}
                    max={this.props.max}
                    onChangeCommitted={(e, value) => this.props.updateColorValue(e, value, this.props.keyValue)}
                />
            </div>
        )
    }

}
