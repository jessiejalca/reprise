import { useParams } from "react-router-dom"

function SongPage() {
    const { songId } = useParams()

    return <h1>Song Page for {songId}</h1>
}

export default SongPage