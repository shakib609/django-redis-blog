from rest_framework_extensions.routers import ExtendedSimpleRouter

from .views import CommentViewSet, PostViewSet, TagViewSet

router = ExtendedSimpleRouter()

posts_routes = router.register(r'posts', PostViewSet, base_name='post')
tags_routes = router.register(r'tags', TagViewSet, base_name='tag')

posts_routes.register(
    r'comments',
    CommentViewSet,
    basename='posts-comment',
    parents_query_lookups=['post'],
)
posts_routes.register(
    r'tags',
    TagViewSet,
    basename='posts-tag',
    parents_query_lookups=['posts'],
)

tags_routes.register(
    r'posts',
    PostViewSet,
    basename='tags-post',
    parents_query_lookups=['tags'],
)

urlpatterns = router.urls
