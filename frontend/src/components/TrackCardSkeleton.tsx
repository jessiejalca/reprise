function TrackCardSkeleton() {
    return (
        <div className="track-card skeleton" aria-hidden="true">
            <span className="skeleton-art" />
            <div>
                <span className="skeleton-line title" />
                <span className="skeleton-line meta" />
            </div>
        </div>
    )
}

export default TrackCardSkeleton
