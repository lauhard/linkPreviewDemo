<script lang="ts">
    type Meta = {
        title: string | undefined,
        image: string | undefined,
        description: string | undefined,
    }
    import * as api from '$lib/api';
    let meta:Meta;
    let href:string;
    $:console.log("meta:", meta);

    const linkPreview = async (e:Event)=>{
        const elem:HTMLAnchorElement = e.target as HTMLAnchorElement;
        href = elem.href;
        meta = await api.GET(fetch, href)
    }
</script>
<h1>Welcome to SvelteKit</h1>
<p>
    Visit 
    <a on:mouseenter={ linkPreview }
        href="https://lisaloof.com/">
        kit.svelte.dev
    </a> 
    to read the documentation
</p>
{#if meta?.image}

    <div class="live-preview" contenteditable>
        <img src="{meta.image}" alt="og preview">
    </div>
    <!-- <iframe src="{href}" frameborder="0"></iframe> -->
    <!-- content here -->
{/if}


<style lang="scss">
    .live-preview {
        background-color: black;
        border: 1px solid red;
        width: 100%;
        height: 100%;
        iframe {
            width: 100%;
            height: 100%;
        }
    }
</style>
