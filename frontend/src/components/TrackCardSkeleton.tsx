function TrackCardSkeleton() {
    return (
        <div className="track-card skeleton" aria-hidden="true">
            <span className="track-card-art skeleton-block" />
            <div className="track-card-info">
                <span className="skeleton-block skeleton-title" />
                <span className="skeleton-block skeleton-meta" />
            </div>
        </div>
    )
}

export default TrackCardSkeleton
