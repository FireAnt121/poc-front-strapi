import React, { useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@strapi/design-system";
import { prefixFileUrlWithBackendUrl, auth } from "@strapi/helper-plugin";
import Editor from "../CKEditor";
import MediaLib from "../MediaLib";
import config from "../../config/ckeditor";

const Wysiwyg = (props) => {
  const { formatMessage } = useIntl();
  const { description, error, intlLabel, placeholder, name, onChange, value } =
    props;
  const [isOpen, setIsOpen] = useState(false);
  const [editor, setEditor] = useState(null);

  const handleChange = (data) => {
    if (data) {
      editor.model.change((writer) => {
        const divElement = writer.createElement("div");
        data.forEach((file) => {
          const url = prefixFileUrlWithBackendUrl(file.url);
          const imageElement = writer.createElement("imageBlock", {
            src: url,
          });
          divElement._appendChild(imageElement);
        });
        editor.model.insertContent(divElement, editor.model.document.selection);
      });
    }

    // Handle videos and other type of files by adding some code
  };

  const toggleMediaLib = (editor) => {
    if (editor) {
      setEditor(editor);
    }
    setIsOpen((prev) => !prev);
  };

  const errorMessage = error
    ? formatMessage({ id: error, defaultMessage: error })
    : "";

  const label = intlLabel.id
    ? formatMessage(
        { id: intlLabel.id, defaultMessage: intlLabel.defaultMessage },
        { ...intlLabel.values }
      )
    : name;

  const hint = description
    ? formatMessage(
        { id: description.id, defaultMessage: description.defaultMessage },
        { ...description.values }
      )
    : "";

  config.strapiMediaLib = {
    onToggle: toggleMediaLib,
    label: label,
  };

  config.strapiUpload = {
    uploadUrl: `${strapi.backendURL}/upload`,
    headers: {
      Authorization: "Bearer " + auth.getToken(),
    },
  };
var myFonts = ['Aclonica', 'Allan', 'Allerta', 'Allerta Stencil', 'Amaranth', 'Angkor', 'Annie Use Your Telescope', 'Anonymous Pro', 'Anton', 'Architects Daughter', 'Arimo', 'Artifika', 'Arvo', 'Astloch', 'Bangers', 'Battambang', 'Bayon', 'Bentham', 'Bevan', 'Bigshot One', 'Bokor', 'Brawler', 'Buda', 'Cabin', 'Cabin Sketch', 'Calligraffitti', 'Candal', 'Cantarell', 'Cardo', 'Carter One', 'Caudex', 'Chenla', 'Cherry Cream Soda', 'Chewy', 'Coda', 'Coda Caption', 'Coming Soon', 'Content', 'Copse', 'Corben', 'Cousine', 'Covered By Your Grace', 'Crafty Girls', 'Crimson Text', 'Crushed', 'Cuprum', 'Damion', 'Dancing Script', 'Dangrek', 'Dawning of a New Day', 'Didact Gothic', 'Droid Sans', 'Droid Sans Mono', 'Droid Serif', 'EB Garamond', 'Expletus Sans', 'Fontdiner Swanky', 'Francois One', 'Freehand', 'GFS Didot', 'GFS Neohellenic', 'Geo', 'Goudy Bookletter 1911', 'Gruppo', 'Handlee', 'Hanuman', 'Holtwood One SC', 'Homemade Apple', 'IM Fell DW Pica', 'IM Fell DW Pica SC', 'IM Fell Double Pica', 'IM Fell Double Pica SC', 'IM Fell English', 'IM Fell English SC', 'IM Fell French Canon', 'IM Fell French Canon SC', 'IM Fell Great Primer', 'IM Fell Great Primer SC', 'Inconsolata', 'Indie Flower', 'Irish Grover', 'Josefin Sans', 'Josefin Slab', 'Judson', 'Jura', 'Just Another Hand', 'Just Me Again Down Here', 'Kenia', 'Khmer', 'Koulen', 'Kranky', 'Kreon', 'Kristi', 'Lato', 'League Script', 'Lekton', 'Limelight', 'Lobster', 'Lora', 'Luckiest Guy', 'Maiden Orange', 'Mako', 'Maven Pro', 'Meddon', 'MedievalSharp', 'Megrim', 'Merriweather', 'Metal', 'Metrophobic', 'Michroma', 'Miltonian', 'Miltonian Tattoo', 'Molengo', 'Monofett', 'Moul', 'Moulpali', 'Mountains of Christmas', 'Muli', 'Neucha', 'Neuton', 'News Cycle', 'Nobile', 'Nova Cut', 'Nova Flat', 'Nova Mono', 'Nova Oval', 'Nova Round', 'Nova Script', 'Nova Slim', 'Nova Square', 'Nunito', 'OFL Sorts Mill Goudy TT', 'Odor Mean Chey', 'Old Standard TT', 'Open Sans', 'Open Sans Condensed', 'Orbitron', 'Oswald', 'Over the Rainbow', 'PT Sans', 'PT Sans Caption', 'PT Sans Narrow', 'PT Serif', 'PT Serif Caption', 'Pacifico', 'Paytone One', 'Permanent Marker', 'Philosopher', 'Play', 'Playfair Display', 'Podkova', 'Preahvihear', 'Puritan', 'Quattrocento', 'Quattrocento Sans', 'Radley', 'Raleway', 'Reenie Beanie', 'Rock Salt', 'Rokkitt', 'Ruslan Display', 'Schoolbell', 'Shanti', 'Siemreap', 'Sigmar One', 'Six Caps', 'Slackey', 'Smythe', 'Sniglet', 'Special Elite', 'Sue Ellen Francisco', 'Sunshiney', 'Suwannaphum', 'Swanky and Moo Moo', 'Syncopate', 'Tangerine', 'Taprom', 'Tenor Sans', 'Terminal Dosis Light', 'The Girl Next Door', 'Tinos', 'Ubuntu', 'Ultra', 'UnifrakturCook', 'UnifrakturMaguntia', 'Unkempt', 'VT323', 'Vibur', 'Vollkorn', 'Waiting for the Sunrise', 'Wallpoet', 'Walter Turncoat', 'Wire One', 'Yanone Kaffeesatz'];

config.font_names = 'serif;sans serif;monospace;cursive;fantasy';

for(var i = 0; i<myFonts.length; i++){
            config.font_names = config.font_names+';'+myFonts[i];
            myFonts[i] = 'http://fonts.googleapis.com/css?family='+myFonts[i].replace(' ','+');
}

// config.contentsCss = ['/ckeditor/contents.css'].concat(myFonts);
  return (
    <Stack size={1}>
      <Stack horizontal size={1}>
        <Typography variant="pi" fontWeight="bold" textColor="neutral800">
          {label}
        </Typography>
      </Stack>
      <div
        style={{
          "line-height": "normal",
        }}
      >
        <Editor
          name={name}
          onChange={onChange}
          value={value || ""}
          config={config}
        />
      </div>
      {(!hint || error) && (
        <Typography
          as="p"
          variant="pi"
          id={`${name}-hint`}
          textColor="neutral600"
        >
          {hint}
        </Typography>
      )}

      {errorMessage && (
        <Box paddingTop={1}>
          <Typography
            variant="pi"
            textColor="danger600"
            data-strapi-field-error
          >
            {errorMessage}
          </Typography>
        </Box>
      )}

      <MediaLib
        onToggle={toggleMediaLib}
        isOpen={isOpen}
        onChange={handleChange}
      />
    </Stack>
  );
};

Wysiwyg.defaultProps = {
  errors: [],
  inputDescription: null,
  label: "",
  noErrorsDescription: false,
  value: "",
};

Wysiwyg.propTypes = {
  errors: PropTypes.array,
  inputDescription: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      id: PropTypes.string,
      params: PropTypes.object,
    }),
  ]),
  name: PropTypes.string.isRequired,
  noErrorsDescription: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default Wysiwyg;
