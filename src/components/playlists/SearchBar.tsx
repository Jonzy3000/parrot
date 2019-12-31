import React, { useState, useEffect } from "react";
import { Search } from "../../services/spotifyApi/search";
import { TextInput, Text, Box, Button } from "grommet";
import { Artist, Track } from "../../types/Playlist";
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
      border={{ color: "neutral-3", size: "small" }}
      pad="small"
      margin={{ vertical: "xxsmall", horizontal: "xxsmall" }}
      round="small"
    >
      <Text truncate size="medium" margin={{ right: "xxsmall" }}>
        {children}
      </Text>
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

const smallestImage = (
  images: { height: number; width: number; url: string }[]
) => {
  return images.sort((a, b) => a.height - b.height)[0];
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

  const onChange = (event: { target: { value: string } }) => {
    console.log(event);
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

  const renderTags = () => [
    ...Object.keys(selected.tracks).map((key: string) => (
      <Tag key={key} onRemove={() => removeFromTracks(key)}>
        {selected.tracks[key].name}
      </Tag>
    )),
    ...Object.keys(selected.artists).map((key: string) => (
      <Tag key={key} onRemove={() => removeFromArtists(key)}>
        {selected.artists[key].name}
      </Tag>
    ))
  ];

  return (
    <Box>
      {renderTags()}
      <Box pad={{ horizontal: "small" }} align="center" direction="row" border>
        <SearchIcon />
        <TextInput
          plain
          value={searchValue}
          onChange={onChange}
          placeholder="Search for some things to base your recommendation on..."
        />
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
