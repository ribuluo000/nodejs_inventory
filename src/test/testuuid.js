/**
 * Created by nick on 2018/1/25.
 */

{
    const uuidv1 = require('uuid/v1');
    let s = uuidv1(); // ⇨ '1c572360-faca-11e7-83ee-9d836d45ff41'
    console.log(s);
    console.log("!--------------------------------------------------------------------!");

}

{
    const uuidv3 = require('uuid/v3');

    let s = '';
    // ... using predefined DNS namespace (for domain names)
    s=uuidv3('hello.example.com', uuidv3.DNS); // ⇨ '9125a8dc-52ee-365b-a5aa-81b0b3681cf6'
    console.log(s);

    // ... using predefined URL namespace (for, well, URLs)
    s=uuidv3('http://example.com/hello', uuidv3.URL); // ⇨ 'c6235813-3ba4-3801-ae84-e0a6ebb7d138'
    console.log(s);

    // ... using a custom namespace
    //
    // Note: Custom namespaces should be a UUID string specific to your application!
    // E.g. the one here was generated using this modules `uuid` CLI.
    const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
    s=uuidv3('Hello, World!', MY_NAMESPACE); // ⇨ 'e8b5a51d-11c8-3310-a6ab-367563f20686'
    console.log(s);

    console.log("!--------------------------------------------------------------------!");

}

{
    const uuidv4 = require('uuid/v4');
    let s=uuidv4(); // ⇨ '45db52e1-f95c-4b5f-99a2-8b8d978c99b4'
    console.log(s);

    console.log("!--------------------------------------------------------------------!");

}


{
    const uuidv5 = require('uuid/v5');

    let s='';
    // ... using predefined DNS namespace (for domain names)
    s=uuidv5('hello.example.com', uuidv5.DNS); // ⇨ 'fdda765f-fc57-5604-a269-52a7df8164ec'
    console.log(s);

    // ... using predefined URL namespace (for, well, URLs)
    s = uuidv5('http://example.com/hello', uuidv5.URL); // ⇨ '3bbcee75-cecc-5b56-8031-b6641c1ed1f1'
    console.log(s);

    // ... using a custom namespace
    //
    // Note: Custom namespaces should be a UUID string specific to your application!
    // E.g. the one here was generated using this modules `uuid` CLI.
    const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
    s = uuidv5('Hello, World!', MY_NAMESPACE); // ⇨ '630eb68f-e0fa-5ecc-887a-7c7a62614681'
    console.log(s);

    console.log("!--------------------------------------------------------------------!");

}


{
    console.log("!--------------------------------------------------------------------!");

}

