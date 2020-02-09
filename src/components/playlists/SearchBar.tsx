import React, { useState, useEffect } from "react";
import { Search } from "../../services/spotifyApi/search";
import { TextInput, Text, Box, Button } from "grommet";
import { Artist, Track, Image } from "../../types/Playlist";
import { FormClose, Search as SearchIcon } from "grommet-icons";
import { Avatar, SquareAvatar } from "../common/Avatar";

interface TagProps {
  onRemove: () => void;
  children?: React.ReactNode;
}

const Tag = ({ onRemove, children }: TagProps) => {
  const tag = (
    <Box
      direction="row"
      align="center"
      justify="between"
      pad={{ horizontal: "medium", vertical: "small" }}
    >
      {children}
      {onRemove && <FormClose size="medium" />}
    </Box>
  );

  if (onRemove) {
    return (
      <Button
        margin={{ vertical: "xxsmall", horizontal: "xxxsmall" }}
        onClick={onRemove}
      >
        {tag}
      </Button>
    );
  }
  return tag;
};

const smallestImage = (images: Image[]) => {
  return images.sort((a, b) => (a.height || 0) - (b.height || 0))[0];
};

export interface SearchBarResult {
  artists: { [key: string]: Artist };
  tracks: { [key: string]: Track };
}

interface SearchBarProps {
  onSelected: (results: SearchBarResult) => void;
}

export const SearchBar = React.memo((props: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState<SearchBarResult>({
    artists: {},
    tracks: {}
  });
  const [suggestions, setSuggestions] = useState<{
    artists: Artist[];
    tracks: Track[];
  }>({ artists: [], tracks: [] });

  const onSearchChange = (event: { target: { value: string } }) => {
    const { value: newValue } = event.target;
    setSearchValue(newValue);
    if (newValue.trim().length === 0) {
      setSuggestions({ artists: [], tracks: [] });
    } else {
      Search.forArtistsAndTracks(newValue, 3).then(setSuggestions);
    }
  };

  useEffect(() => {
    props.onSelected(selected);
  }, [selected, props]);

  const addToArtists = (artist: Artist) => {
    setSelected(prevSelected => ({
      ...prevSelected,
      artists: { ...prevSelected.artists, [artist.id]: artist }
    }));
  };

  const addToTracks = (track: Track) => {
    setSelected(prevSelected => ({
      ...prevSelected,
      tracks: { ...prevSelected.tracks, [track.id]: track }
    }));
  };

  const removeFromTracks = (trackId: string) => {
    setSelected(prevSelected => {
      const copy = { ...prevSelected };
      delete copy.tracks[trackId];
      return copy;
    });
  };

  const removeFromArtists = (artistId: string) => {
    setSelected(prevSelected => {
      const copy = { ...prevSelected };
      delete copy.artists[artistId];
      return copy;
    });
  };

  const getBGColor = (index: number): string =>
    index % 2 === 0 ? "light-1" : "white";

  const renderSelected = () => [
    ...Object.keys(selected.tracks).map((key: string, index: number) => (
      <Box key={key} background={getBGColor(index)}>
        <Tag onRemove={() => removeFromTracks(key)}>
          <Box direction="row">
            <Text>{selected.tracks[key].name} - </Text>
            <Text color="dark-3">
              {selected.tracks[key].artists.combinedLabel}
            </Text>
          </Box>
        </Tag>
      </Box>
    )),
    ...Object.keys(selected.artists).map((key: string, index: number) => (
      <Box
        key={key}
        background={getBGColor(index + Object.keys(selected.tracks).length)}
      >
        <Tag onRemove={() => removeFromArtists(key)}>
          <Box direction="row">
            <Text>{selected.artists[key].name}</Text>
          </Box>
        </Tag>
      </Box>
    ))
  ];

  return (
    <Box>
      <Text>Suggestions</Text>
      <Box round="xxsmall" border>
        {renderSelected()}
        <Box pad={{ horizontal: "small" }} align="center" direction="row">
          <SearchIcon />
          <TextInput
            plain
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search for some things to base your recommendation on..."
          />
        </Box>
      </Box>
      {searchValue.trim().length > 0 && (
        <Box>
          {suggestions.tracks.map((track: Track) => (
            <TrackItem
              key={track.id}
              track={track}
              onClick={() => addToTracks(track)}
            />
          ))}
          {suggestions.artists.map((artist: Artist) => (
            <ArtistItem
              artist={artist}
              key={artist.id}
              onClick={() => addToArtists(artist)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
});

// TODO add default icon if no album images
const TrackItem = React.memo(
  ({ track, onClick }: { track: Track; onClick?: () => void }) => (
    <Box pad="small" align="center" direction="row" onClick={onClick}>
      <SquareAvatar url={`url(${smallestImage(track.album.images).url})`} />
      <Box margin={{ left: "small" }}>
        <Text truncate size="medium">
          {track.name}
        </Text>
        <Text truncate color="dark-3">
          Song - {track.artists.combinedLabel}
        </Text>
      </Box>
    </Box>
  )
);

// TODO add default icon if no artists images
const ArtistItem = React.memo(
  ({ artist, onClick }: { artist: Artist; onClick?: () => void }) => (
    <Box pad="small" align="center" direction="row" onClick={onClick}>
      {artist.images !== undefined && artist.images.length > 0 && (
        <Avatar url={`url(${smallestImage(artist.images).url})`} />
      )}
      <Box margin={{ left: "small" }}>
        <Text truncate size="medium">
          {artist.name}
        </Text>
        <Text color="dark-3">Artist</Text>
      </Box>
    </Box>
  )
);
