import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function CountryCard({imageSource,alternateTitle,countryName,population,region,capital}) {
  return (
    <Card className="shadow-mainShadow bg-main dark:bg-mainDark! dark:text-main!">
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imageSource}
          alt={alternateTitle}
        />
        <Link to={`/country/${countryName}`}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="font-semibold!"
            >
              {countryName}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
              className="text-lg! dark:text-main!"
            >
              {/* Card Title */}
              <span className="capitalize font-semibold">population : </span>
              <span>{population}</span>
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
              className="text-lg! dark:text-main!"
            >
              <span className="capitalize font-semibold">region : </span>
              <span>{region}</span>
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
              className="text-lg! dark:text-main!"
            >
              <span className="capitalize font-semibold">capital : </span>
              <span>{capital}</span>
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}
