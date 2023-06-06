class Queue() {
    private urls: string[];

    constructor(){
        this.urls = [];
    }
    enqueue(url: string): void {
        this.urls.push(url);
    }
    dequeue(): string | undefined {
        return this.urls.shift();
    }
    isEmpty(): boolean {
        return this.urls.length === 0;
    }

    peek(): string | undefined {
        return this.urls[0];
    }

    size(): number {
        return this.urls.length;
    }

}


async function checkStatus(url: string): Promise<boolean> {
    try {
        const cleanURL = new URL(url);
        const response = await fetch(cleanURL);
        return response.ok;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}

async function main() {
    const file = (await Deno.readTextFile(".env")).split("\n");
    const queue = new Queue();
    while (queue.size() !== 0) {
        const url = queue.dequeue() as string;
        if (await checkStatus(url)) {
            console.log(`${url} is up!`);
        }
        else {
            console.log(`${url} is down !`);
        }
    }
}

await main();

export { };
