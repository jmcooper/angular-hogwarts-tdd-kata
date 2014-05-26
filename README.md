Angular Hogwarts TDD Kata
=========================

Introduction
------------

Hogwarts has embraced Muggle Technology!

You have been hired to create Hogwarts online student registration.

Because you have the discipline of a Wizard, you will be writing it test first.

Setup
-----

First Story: Show Course Catalog
--------------------------------

Acceptance: Students will be able to see a catalog of classes.


### First Test

How will you start? **First I will create the html to display the catalog inside the ``<tbody>`` tag.**



```html
<!-- catalog/catalog.html -->

                <tr ng-repeat="course in catalog">
                    <td>{{course.name}}</td>
                    <td>{{course.startTime | date: 'h:mm a'}}</td>
                    <td>{{course.professor}}</td>
                    <td>{{course.credits}}</td>
                </tr>
```

I see you are planning on having a ``catalog`` on the ``CatalogController`` scope. **Yes**

How will you load it? **I will load it when the Controller loads.**

Can you write a test for this? **Yes!**

```js
// test/catalog/catalog-controller-specs.js

describe('CatalogController', function () {

    describe('when the controller first loads', function () {

        it('should retrieve the course catalog', function () {
            expect(mockCatalogRepository.getCatalog.called).toBeTruthy();
        });

    });

});
```

Will this pass? **No, it doesn't even fail. It need some setup before it can even pass. But I will load into my browser just to see it fail.**


        it('should put the catalog on the scope', function() {
            expect(scope.catalog).toEqual(catalog)
        });


                    <td><a href="javascript:void(0);" ng-click="register(course.id)">Register</a></td>



    var scope, mockCatalogRepository, mockRegistrationService;
    var catalog = [{foo: 'bar'}];

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller, CatalogRepository, RegistrationService) {
            scope = $rootScope.$new();

            mockCatalogRepository = sinon.stub(CatalogRepository);
            mockCatalogRepository.getCatalog.returns(catalog);

            mockRegistrationService = sinon.stub(RegistrationService);

            $controller("CatalogController", { $scope: scope, CatalogRepository: mockCatalogRepository  });
        });
    });
